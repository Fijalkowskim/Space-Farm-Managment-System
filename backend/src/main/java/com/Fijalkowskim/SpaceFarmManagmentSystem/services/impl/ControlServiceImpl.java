package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.ControlRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PlantRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @Autowired
    public ControlServiceImpl(ControlDAORepository controlDAORepository) {
        this.controlDAORepository = controlDAORepository;
    }

    public Control addControlToStage(Stage stage, Control control){
        control.setStage(stage);
        return controlDAORepository.save(control);
    }

    public Page<Control> getControls(Pageable pageable) {
        return controlDAORepository.findAll(pageable);
    }

    public Page<Control> getControlsByStage(Pageable pageable, Stage stage) {
        return controlDAORepository.findControlByStage(stage, pageable);
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
        Control control = Control.builder()
                .controlDate(controlRequest.getControlDate())
                .deadSeedlings(controlRequest.getDeadSeedlings())
                .readings(controlRequest.getReadings())
                .build();
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
}
