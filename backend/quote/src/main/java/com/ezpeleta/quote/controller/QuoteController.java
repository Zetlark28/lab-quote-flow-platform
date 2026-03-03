package com.ezpeleta.quote.controller;

import com.ezpeleta.quote.application.common.controller.BaseController;
import com.ezpeleta.quote.application.common.dto.ResponseList;
import com.ezpeleta.quote.application.common.service.BaseServiceImpl;
import com.ezpeleta.quote.domain.dto.QuoteDto;
import com.ezpeleta.quote.domain.entity.Quote;
import com.ezpeleta.quote.domain.service.QuoteService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quotes")
public class QuoteController extends BaseController<Quote, QuoteDto, Long> {

    protected QuoteController(BaseServiceImpl<Quote, Long, QuoteDto> service) {
        super(service);
    }

    @Override
    @PostMapping("/create")
    public ResponseEntity<QuoteDto> create(QuoteDto dto) {
        return super.create(dto);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<QuoteDto> getById(@PathVariable Long id) {
        return super.getById(id);
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<QuoteDto> update(@PathVariable Long id, @RequestBody QuoteDto dto) {
        return super.update(id, dto);
    }

    @Override
    @GetMapping("")
    public ResponseEntity<ResponseList<QuoteDto>> findAll(@ParameterObject QuoteDto filter,
                                                          @ParameterObject Pageable pageable) {
        return ResponseEntity.ok(service.findAll(filter, pageable));
    }

    @PostMapping("/send-to-approval")
    public ResponseEntity<Void> sendToApproval(Long id) throws JsonProcessingException {
        ((QuoteService) service).sendToApproval(id);
        return ResponseEntity.ok().build();
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}
