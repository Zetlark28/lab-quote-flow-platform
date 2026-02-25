package com.ezpeleta.quote.domain.dto;

import com.ezpeleta.quote.common.dto.BaseDto;
import com.ezpeleta.quote.domain.entity.QuoteStatusEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class QuoteDto extends BaseDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private String description;

    private String author;

    private String customerName;

    private QuoteStatusEnum status;

    private String customerEmail;

    private BigDecimal totalAmount;
}
