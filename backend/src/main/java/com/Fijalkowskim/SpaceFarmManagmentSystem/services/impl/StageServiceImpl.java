package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StageService;
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
public class StageServiceImpl implements StageService {
    private final StageDAORepository stageDAORepository;

    @Autowired
    public StageServiceImpl(StageDAORepository stageDAORepository) {
        this.stageDAORepository = stageDAORepository;
    }

    @Override
    public Stage addControlToStage(Stage stage, Control control) {
        stage.getControls().add(control);
        return stageDAORepository.save(stage);
    }

    @Override
    public void deleteStage(long id) {
        Optional<Stage> optionalStage = stageDAORepository.findById(id);
        if(optionalStage.isEmpty()) throw new CustomHTTPException("Stage not found", HttpStatus.NOT_FOUND);
        stageDAORepository.deleteById(id);
    }

    @Override
    public Stage updateStage(long id, StageRequest stageRequest) {
        Optional<Stage> optionalStage = stageDAORepository.findById(id);
        if(optionalStage.isEmpty()) throw new CustomHTTPException("Stage not found", HttpStatus.NOT_FOUND);
        Stage stage = Stage.builder()
                .id(optionalStage.get().getId())
                .cultivation(optionalStage.get().getCultivation())
                .stageType(stageRequest.getStageType())
                .startStageDate(stageRequest.getStartStageDate())
                .finishStageDate(stageRequest.getFinishStageDate())
                .controls(stageRequest.getControls())
                .comment(stageRequest.getComment())
                .build();
        return stageDAORepository.save(stage);
    }

    @Override
    public Stage addStage(StageRequest stageRequest) {
        Stage stage = Stage.builder()
                .stageType(stageRequest.getStageType())
                .startStageDate(stageRequest.getStartStageDate())
                .finishStageDate(stageRequest.getFinishStageDate())
                .comment(stageRequest.getComment())
                .controls(new HashSet<>())
                .controls(stageRequest.getControls())
                .build();
        return stageDAORepository.save(stage);
    }

    @Override
    public Stage getStageById(long id) throws CustomHTTPException {
        Optional<Stage> optionalStage = stageDAORepository.findById(id);
        if(optionalStage.isEmpty()) throw new CustomHTTPException("Stage not found", HttpStatus.NOT_FOUND);
        return optionalStage.get();
    }

    @Override
    public Page<Stage> getStages(PageRequest pageRequest) {
        return stageDAORepository.findAll(pageRequest);
    }
}
