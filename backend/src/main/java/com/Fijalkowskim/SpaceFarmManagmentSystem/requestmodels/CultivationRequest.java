package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.*;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class CultivationRequest {
    private Date startDate;
    private CultivationType type;
    private float area;
    private Date plannedFinishDate;
    private Date realFinishDate;
    private Plant plant;
    private String comment;
}
