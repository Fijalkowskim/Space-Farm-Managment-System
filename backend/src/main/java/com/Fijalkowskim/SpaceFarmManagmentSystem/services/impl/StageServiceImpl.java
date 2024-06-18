package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Transactional
@Service
public class StageServiceImpl implements StageService {
    private final StageDAORepository stageDAORepository;
    private final CultivationDAORepository cultivationDAORepository;
    private final ControlDAORepository controlDAORepository;

    @Autowired
    public StageServiceImpl(StageDAORepository stageDAORepository, CultivationDAORepository cultivationDAORepository, ControlDAORepository controlDAORepository) {
        this.stageDAORepository = stageDAORepository;
        this.cultivationDAORepository = cultivationDAORepository;
        this.controlDAORepository = controlDAORepository;
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
        if(stageRequest.getStageType() == null) throw new CustomHTTPException("Stage type can't be empty", HttpStatus.BAD_REQUEST);
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
        Optional<Cultivation> cultivation = cultivationDAORepository.findById(stageRequest.getCultivationId());
        if(cultivation.isEmpty()) throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        if(stageRequest.getStageType() == null) throw new CustomHTTPException("Stage type can't be empty", HttpStatus.BAD_REQUEST);
        Stage stage = Stage.builder()
                .stageType(stageRequest.getStageType())
                .startStageDate(stageRequest.getStartStageDate())
                .finishStageDate(stageRequest.getFinishStageDate())
                .comment(stageRequest.getComment())
                .controls(new HashSet<>())
                .cultivation(cultivation.get())
                .build();
        cultivation.get().getStages().add(stage);
        cultivationDAORepository.save(cultivation.get());
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

    public Page<Control> getControlsByStage(Pageable pageable, long stageId) {
        Optional<Stage> stage = stageDAORepository.findById(stageId);
        if(stage.isEmpty()) throw new CustomHTTPException("Stage not found", HttpStatus.NOT_FOUND);
        return controlDAORepository.findControlByStage(stage.get(), pageable);
    }

    public Set<Stage> getStagesByCultivationId(long cultivationId) {
        return stageDAORepository.findAllByCultivationId(cultivationId);
    }
}
