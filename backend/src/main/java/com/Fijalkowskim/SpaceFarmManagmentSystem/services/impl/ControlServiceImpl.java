package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ReadingDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.ControlRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PlantRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;

@Transactional
@Service
public class ControlServiceImpl implements ControlService {
    private final ControlDAORepository controlDAORepository;
    private final StageDAORepository stageDAORepository;
    private final ReadingDAORepository readingDAORepository;

    @Autowired
    public ControlServiceImpl(ControlDAORepository controlDAORepository, StageDAORepository stageDAORepository, ReadingDAORepository readingDAORepository) {
        this.controlDAORepository = controlDAORepository;
        this.stageDAORepository = stageDAORepository;
        this.readingDAORepository = readingDAORepository;
    }

    public Page<Control> getControls(Pageable pageable) {
        return controlDAORepository.findAll(pageable);
    }

    public Control getControlById(long id) {
        Optional<Control> control = controlDAORepository.findById(id);
        if(control.isEmpty()) throw new CustomHTTPException("Control not found", HttpStatus.NOT_FOUND);
        return control.get();
    }

    public void deleteControl(long id) {
        Optional<Control> control = controlDAORepository.findById(id);
        if(control.isEmpty()) throw new CustomHTTPException("Control not found", HttpStatus.NOT_FOUND);
        controlDAORepository.deleteById(id);
    }

    public Control addControl(ControlRequest controlRequest) {
        Optional<Stage> stage = stageDAORepository.findById(controlRequest.getStageId());
        if(stage.isEmpty()) throw new CustomHTTPException("Stage not found", HttpStatus.NOT_FOUND);

        Date today = new Date();
        Date controlDate = controlRequest.getControlDate();

        if (controlDate.after(today)) {
            throw new CustomHTTPException("Control date cannot be in the future", HttpStatus.BAD_REQUEST);
        }

        Control control = Control.builder()
                .controlDate(controlRequest.getControlDate())
                .deadSeedlings(controlRequest.getDeadSeedlings())
                .readings(new HashSet<>())
                .stage(stage.get())
                .build();
        stage.get().getControls().add(control);
        stageDAORepository.save(stage.get());
        return controlDAORepository.save(control);
    }

    public Control updateControl(long id, ControlRequest controlRequest) throws CustomHTTPException {
        Optional<Control> oldControl = controlDAORepository.findById(id);
        if(oldControl.isEmpty()) throw new CustomHTTPException("Control not found", HttpStatus.NOT_FOUND);
        Control newControl = Control.builder()
                .controlDate(controlRequest.getControlDate())
                .deadSeedlings(controlRequest.getDeadSeedlings())
                .readings(controlRequest.getReadings())
                .id(oldControl.get().getId())
                .stage(oldControl.get().getStage())
                .build();
        return controlDAORepository.save(newControl);
    }

    public Page<Control> getControlsByStageId(PageRequest pageRequest, long id) {
        Optional<Stage> stage = stageDAORepository.findById(id);
        if(stage.isEmpty()) throw new CustomHTTPException("Stage not found", HttpStatus.NOT_FOUND);
        return controlDAORepository.findControlByStage(stage.get(), pageRequest);
    }
}
