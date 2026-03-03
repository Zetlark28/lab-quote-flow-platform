package com.ezpeleta.quote.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OutboxKafkaPayload {

    private Long eventId;
    private String serviceSource;
    private String aggregateType;
    private Long aggregateId;
    private String type;

    public OutboxKafkaPayload(String type, String serviceSource, Long aggregateId, String aggregateType) {
        this.type = type;
        this.aggregateId = aggregateId;
        this.aggregateType = aggregateType;
        this.serviceSource = serviceSource;
    }
}
