package com.ezpeleta.quote.domain.service;

import com.ezpeleta.quote.application.common.exception.UpdateEntityNotValid;
import com.ezpeleta.quote.application.common.mapper.BaseMapper;
import com.ezpeleta.quote.application.common.service.BaseServiceImpl;
import com.ezpeleta.quote.domain.dto.OutboxKafkaPayload;
import com.ezpeleta.quote.domain.dto.QuoteDto;
import com.ezpeleta.quote.domain.entity.OutboxEvent;
import com.ezpeleta.quote.domain.entity.OutboxStatusEnum;
import com.ezpeleta.quote.domain.entity.Quote;
import com.ezpeleta.quote.domain.entity.QuoteStatusEnum;
import com.ezpeleta.quote.domain.repository.OutboxEventRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class QuoteServiceImpl extends BaseServiceImpl<Quote, Long, QuoteDto> implements QuoteService {

    private final OutboxEventRepository outboxEventRepository;
    private final ObjectMapper objectMapper;

    public QuoteServiceImpl(JpaRepository<Quote, Long> repository, BaseMapper<Quote, QuoteDto> mapper, OutboxEventRepository outboxEventRepository, ObjectMapper objectMapper) {
        super(repository, mapper);
        this.outboxEventRepository = outboxEventRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    @Transactional
    public QuoteDto create(QuoteDto dto) {
        dto.setStatus(QuoteStatusEnum.DRAFT);
        return super.create(dto);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Quote quote = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity with id: " + id + " not found "));
        if(quote.getStatus().equals(QuoteStatusEnum.APPROVED) || quote.getStatus().equals(QuoteStatusEnum.PENDING_APPROVAL)){
            throw new UpdateEntityNotValid("Quote can't be deleted because status is " + quote.getStatus());
        }
        super.delete(id);
    }

    @Override
    @Transactional(rollbackOn = JsonProcessingException.class)
    public void sendToApproval(Long id) {
        Quote quote = repository.findById(id).orElseThrow(() -> new RuntimeException("Quote not found"));
        if(quote.getStatus() != QuoteStatusEnum.DRAFT && quote.getStatus() != QuoteStatusEnum.REJECTED) {
            throw new UpdateEntityNotValid("Only quotes in DRAFT and REJECTED status can be sent to approval");
        }
        quote.setStatus(QuoteStatusEnum.PENDING_APPROVAL);

        repository.save(quote);
        OutboxKafkaPayload outboxKafkaPayload = new OutboxKafkaPayload("QUOTE", Quote.class.getTypeName(), quote.getId(), "QUOTE_PENDING_APPROVAL");


        outboxEventRepository.save(new OutboxEvent(null, Quote.class.getTypeName(), quote.getId(), "QUOTE_PENDING_APPROVAL",
                objectMapper.valueToTree(outboxKafkaPayload),
                OutboxStatusEnum.PENDING));


    }


}
