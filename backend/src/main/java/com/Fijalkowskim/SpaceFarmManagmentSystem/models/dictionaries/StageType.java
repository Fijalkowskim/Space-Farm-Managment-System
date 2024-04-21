package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class StageType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "stageType")
    private Set<Stage> stage;
}
