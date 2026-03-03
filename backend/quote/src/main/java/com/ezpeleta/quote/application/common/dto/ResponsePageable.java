package com.ezpeleta.quote.application.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResponsePageable<DTO extends BaseDto> extends ResponseList<DTO> {

    private int totalPages;
    private long totalElements;
    private int page;
    private int size;

}
