package com.ezpeleta.quote.common.mapper;

import com.ezpeleta.quote.common.dto.BaseDto;
import com.ezpeleta.quote.common.entity.BaseEntity;

import java.util.List;

public interface BaseMapper<E extends BaseEntity, DTO extends BaseDto> {
    DTO toDto(E entity);

    E toEntity(DTO dto);

    List<DTO> toDtoList(List<E> entities);

    List<E> toEntityList(List<DTO> dtos);

    E updateEntityFromDto(DTO dto, E entity);

}
