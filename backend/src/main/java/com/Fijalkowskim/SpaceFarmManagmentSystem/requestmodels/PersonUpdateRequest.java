package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import lombok.Data;

@Data
public class PersonUpdateRequest {
    private String name;

    private String surname;

    private WorkerType role;
}
