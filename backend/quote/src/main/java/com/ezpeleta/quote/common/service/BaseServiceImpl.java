package com.ezpeleta.quote.common.service;

import com.ezpeleta.quote.common.dto.BaseDto;
import com.ezpeleta.quote.common.entity.BaseEntity;
import com.ezpeleta.quote.common.mapper.BaseMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public abstract class BaseServiceImpl<E extends BaseEntity, ID,  DTO extends BaseDto> implements BaseService<DTO, ID> {

    protected final JpaRepository<E, ID> repository;
    protected final BaseMapper<E, DTO> mapper;

    protected BaseServiceImpl(JpaRepository<E, ID> repository, BaseMapper<E, DTO> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public DTO create(DTO dto) {
        E entity = mapper.toEntity(dto);
        E savedEntity = repository.save(entity);
        return mapper.toDto(savedEntity);
    }

    @Override
    public DTO getById(ID id) {
        E entity = repository.findById(id).orElseThrow(() -> new RuntimeException("Entity not found"));
        return mapper.toDto(entity);
    }

    @Override
    public DTO update(ID id, DTO dto) {
        E existingEntity = repository.findById(id).orElseThrow(() -> new RuntimeException("Entity not found"));
        E updatedEntity = mapper.updateEntityFromDto(dto, existingEntity);
        updatedEntity.setId(existingEntity.getId());
        E savedEntity = repository.save(updatedEntity);
        return mapper.toDto(savedEntity);
    }

    @Override
    public java.util.List<DTO> findAll() {
        java.util.List<E> entities = repository.findAll();
        return mapper.toDtoList(entities);
    }

    @Override
    public void delete(ID id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Entity not found");
        }
        repository.deleteById(id);
    }

    @Override
    public boolean existsById(ID id) {
        return repository.existsById(id);
    }




}
