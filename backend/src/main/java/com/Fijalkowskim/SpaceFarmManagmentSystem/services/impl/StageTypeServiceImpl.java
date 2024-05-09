package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageTypeDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageTypeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;

@Transactional
@Service
public class StageTypeServiceImpl {
    private final StageTypeDAORepository stageTypeDAORepository;

    @Autowired
    public StageTypeServiceImpl(StageTypeDAORepository stageTypeDAORepository) {
        this.stageTypeDAORepository = stageTypeDAORepository;
    }

    public Page<StageType> getAllStageTypes(PageRequest pageRequest) {
        return stageTypeDAORepository.findAll(pageRequest);
    }

    public StageType getStageTypeById(long id) throws CustomHTTPException {
        Optional<StageType> stageType = stageTypeDAORepository.findById(id);
        if(stageType.isEmpty()) {
            throw new CustomHTTPException("Stage type not found", HttpStatus.NOT_FOUND);
        }
        return stageType.get();
    }

    public StageType addStageType(StageTypeRequest stageTypeRequest) throws CustomHTTPException {
        StageType stageType = StageType.builder()
                .name(stageTypeRequest.getName())
                .stages(new HashSet<>())
                .build();
        return stageTypeDAORepository.save(stageType);
    }

    public StageType updateStageType(long id, StageTypeRequest stageTypeRequest) throws CustomHTTPException {
        Optional<StageType> oldStageType = stageTypeDAORepository.findById(id);
        if(oldStageType.isEmpty()) {
            throw new CustomHTTPException("Stage type not found", HttpStatus.NOT_FOUND);
        }
        StageType newStageType = StageType.builder()
                .name(stageTypeRequest.getName())
                .stages(new HashSet<>())
                .id(oldStageType.get().getId())
                .build();
        return stageTypeDAORepository.save(newStageType);
    }

    public void deleteStageType(long id) throws CustomHTTPException {
        Optional<StageType> stageType = stageTypeDAORepository.findById(id);
        if(stageType.isEmpty()) {
            throw new CustomHTTPException("Stage type not found", HttpStatus.NOT_FOUND);
        }
        stageTypeDAORepository.delete(stageType.get());
    }
}
