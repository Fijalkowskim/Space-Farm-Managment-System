package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class ControlRequest {
    private Date controlDate;

    private int deadSeedlings;

    private Set<Reading> readings;
}
