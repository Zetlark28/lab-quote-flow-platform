package com.ezpeleta.quote.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OutboxKafkaPayload {

    private String serviceSource;
    private String aggregateType;
    private Long aggregateId;
    private String type;
}
