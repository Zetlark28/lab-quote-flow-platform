package com.ezpeleta.quote.scheduler;

import com.ezpeleta.quote.domain.dto.OutboxKafkaPayload;
import com.ezpeleta.quote.domain.entity.OutboxEvent;
import com.ezpeleta.quote.domain.entity.OutboxStatusEnum;
import com.ezpeleta.quote.domain.repository.OutboxEventRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OutboxScheduler {

    private final ObjectMapper objectMapper;
    private final OutboxEventRepository outboxEventRepository;
    private final KafkaTemplate<String, OutboxKafkaPayload> kafkaTemplate;

    @Scheduled(fixedDelay = 1000) // Esegui ogni 5 secondi
    @Transactional(rollbackOn = RuntimeException.class)
    public void processOutbox() {

        log.info("Processing outbox...");
        OutboxEvent filter = new OutboxEvent();
        filter.setStatus(OutboxStatusEnum.PENDING);
        outboxEventRepository.findOne(Example.of(filter)).ifPresent(
                outboxEvent -> {
                    log.info("outbox event found with id: {}", outboxEvent.getId());
                    OutboxKafkaPayload payload;
                    try {
                        payload = objectMapper.readValue(outboxEvent.getPayloadJson().toString(), OutboxKafkaPayload.class);
                        payload.setEventId(outboxEvent.getId());
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                    kafkaTemplate.send("quote",payload.getAggregateId().toString(), payload);
                    log.info("outbox event with id {} sent to kafka topic quote", outboxEvent.getId());
                    outboxEvent.setStatus(OutboxStatusEnum.PROCESSED);
                    outboxEventRepository.save(outboxEvent);

                }
        );
        log.info("end processing outbox...");
    }
}
