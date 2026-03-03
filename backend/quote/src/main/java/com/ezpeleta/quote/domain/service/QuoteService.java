package com.ezpeleta.quote.domain.service;

import com.ezpeleta.quote.application.common.service.BaseService;
import com.ezpeleta.quote.domain.dto.QuoteDto;
import com.fasterxml.jackson.core.JsonProcessingException;


public interface QuoteService extends BaseService<QuoteDto, Long> {

    void sendToApproval(Long id) throws JsonProcessingException;
}
