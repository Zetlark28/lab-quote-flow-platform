package com.ezpeleta.quote.domain.mapper;

import com.ezpeleta.quote.domain.dto.QuoteDto;
import com.ezpeleta.quote.domain.entity.Quote;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuoteMapperImpl implements QuoteMapper {
    @Override
    public QuoteDto toDto(Quote entity) {
        if (entity == null) {
            return null;
        }
        QuoteDto dto = new QuoteDto();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        dto.setAuthor(entity.getAuthor());
        dto.setCustomerName(entity.getCustomerName());
        dto.setStatus(entity.getStatus());
        dto.setCustomerEmail(entity.getCustomerEmail());
        dto.setTotalAmount(entity.getTotalAmount());
        return dto;
    }

    @Override
    public Quote toEntity(QuoteDto dto) {
        if (dto == null) {
            return null;
        }

        Quote entity = new Quote();
        entity.setId(dto.getId());
        entity.setDescription(dto.getDescription());
        entity.setAuthor(dto.getAuthor());
        entity.setCustomerName(dto.getCustomerName());
        entity.setStatus(dto.getStatus());
        entity.setCustomerEmail(dto.getCustomerEmail());
        entity.setTotalAmount(dto.getTotalAmount());
        return entity;
    }

    @Override
    public List<QuoteDto> toDtoList(List<Quote> entities) {
        if (entities.isEmpty()) {
            return List.of();
        }
        return entities.stream().map(this::toDto).toList();
    }

    @Override
    public List<Quote> toEntityList(List<QuoteDto> quoteDtos) {
        if (quoteDtos.isEmpty()) {
            return List.of();
        }
        return quoteDtos.stream().map(this::toEntity).toList();
    }

    @Override
    public void updateEntityFromDto(QuoteDto dto, Quote entity) {
        if (dto == null || entity == null) {
            return;
        }

        entity.setAuthor(dto.getAuthor());
        entity.setDescription(dto.getDescription());
        entity.setCustomerName(dto.getCustomerName());
        entity.setCustomerEmail(dto.getCustomerEmail());
        entity.setTotalAmount(dto.getTotalAmount());

    }
}
