package com.ezpeleta.quote.domain.dto;

import com.ezpeleta.quote.application.common.dto.BaseDto;
import com.ezpeleta.quote.domain.entity.QuoteStatusEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuoteDto extends BaseDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private String description;

    private String author;

    private String customerName;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private QuoteStatusEnum status;

    private String customerEmail;

    private BigDecimal totalAmount;
}
