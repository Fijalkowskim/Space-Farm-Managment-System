package com.Fijalkowskim.SpaceFarmManagmentSystem.services;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface StageService {
    Page<Stage> getStages(PageRequest pageRequest);

    Stage getStageById(long id);

    Stage addStage(StageRequest stageRequest);

    Stage updateStage(long id, StageRequest stageRequest);

    void deleteStage(long id);

    Stage addControlToStage(Stage stage, Control control);
}
