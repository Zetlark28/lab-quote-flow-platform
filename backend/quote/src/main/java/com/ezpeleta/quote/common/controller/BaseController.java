package com.ezpeleta.quote.common.controller;

import com.ezpeleta.quote.common.dto.BaseDto;
import com.ezpeleta.quote.common.entity.BaseEntity;
import com.ezpeleta.quote.common.service.BaseServiceImpl;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public abstract class BaseController<E extends BaseEntity, DTO extends BaseDto, ID> {

    protected final BaseServiceImpl<E, ID, DTO> service;

    protected BaseController(BaseServiceImpl<E, ID, DTO> service) {
        this.service = service;
    }

    @Transactional
    public ResponseEntity<DTO> create(@Valid @RequestBody DTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    public ResponseEntity<DTO> getById(ID id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @Transactional
    public ResponseEntity<DTO> update(ID id, @Valid @RequestBody DTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    public ResponseEntity<List<DTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    public void delete(ID id) {
        service.delete(id);
    }

    public boolean existsById(ID id) {
        return service.existsById(id);
    }

}
