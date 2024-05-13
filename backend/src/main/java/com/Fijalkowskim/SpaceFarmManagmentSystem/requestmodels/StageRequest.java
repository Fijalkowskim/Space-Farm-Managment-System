package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class StageRequest {
    private StageType stageType;

    private Date startStageDate;

    private Date finishStageDate;

    private String comment;

    private Set<Control> controls;

    private long cultivationId;
}
