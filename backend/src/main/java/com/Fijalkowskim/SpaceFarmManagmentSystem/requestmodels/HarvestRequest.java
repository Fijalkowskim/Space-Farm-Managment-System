package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import lombok.Data;

import java.util.Date;

@Data
public class HarvestRequest {

    private Date harvestDate;

    private boolean successfulHarvest;

    private String comment;

    private long cultivationId;
}
