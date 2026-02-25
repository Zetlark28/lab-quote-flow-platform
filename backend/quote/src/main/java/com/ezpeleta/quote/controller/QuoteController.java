package com.ezpeleta.quote.controller;

import com.ezpeleta.quote.common.controller.BaseController;
import com.ezpeleta.quote.common.service.BaseServiceImpl;
import com.ezpeleta.quote.domain.dto.QuoteDto;
import com.ezpeleta.quote.domain.entity.Quote;
import com.ezpeleta.quote.domain.service.QuoteService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quotes")
public class QuoteController extends BaseController<Quote, QuoteDto, Long> {

    protected QuoteController(BaseServiceImpl<Quote, Long, QuoteDto> service) {
        super(service);
    }

    @Override
    @PostMapping("create")
    public ResponseEntity<QuoteDto> create(QuoteDto dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<QuoteDto> getById(Long id) {
        return super.getById(id);
    }

    @PostMapping("/send-to-approval")
    public ResponseEntity<Void> sendToApproval(Long id) throws JsonProcessingException {
        ((QuoteService) service).sendToApproval(id);
        return ResponseEntity.ok().build();
    }


}
