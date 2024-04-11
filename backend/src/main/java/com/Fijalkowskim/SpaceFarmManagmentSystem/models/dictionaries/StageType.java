package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class StageType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToOne(mappedBy = "stageType")
    private Stage stage;
}
