package com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import lombok.Data;

@Data
public class PersonRequest {
    private String name;

    private String surname;

    private String login;

    private String password;

    private WorkerType role;
}
