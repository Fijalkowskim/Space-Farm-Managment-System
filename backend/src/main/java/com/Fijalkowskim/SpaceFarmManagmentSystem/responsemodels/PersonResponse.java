package com.Fijalkowskim.SpaceFarmManagmentSystem.responsemodels;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import jakarta.persistence.ManyToMany;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class PersonResponse {
    private Long id;
    private String name;
    private String surname;
    private WorkerType role;
    private Set<Cultivation> cultivations;

    public PersonResponse(Long id, String name, String surname, WorkerType role, Set<Cultivation> cultivations) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.cultivations = cultivations;
    }

    public PersonResponse() {
    }
}
