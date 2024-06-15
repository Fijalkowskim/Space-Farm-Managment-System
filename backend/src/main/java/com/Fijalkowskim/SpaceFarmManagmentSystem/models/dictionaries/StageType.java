package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Builder
public class StageType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "stageType")
    @JsonIgnore
    private Set<Stage> stages;

    public StageType() {

    }

    public StageType(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public StageType(long id, String name, Set<Stage> stages) {
        this.id = id;
        this.name = name;
        this.stages = stages;
    }
}
