package com.ezpeleta.quote.common.service;

import com.ezpeleta.quote.common.dto.BaseDto;
import com.ezpeleta.quote.common.entity.BaseEntity;

import java.util.List;

public interface BaseService<DTO extends BaseDto, ID> {


    DTO create(DTO dto);

    DTO getById(ID id);

    DTO update(ID id, DTO dto);

    List<DTO> findAll();

    void delete(ID id);

    boolean existsById(ID id);
}
