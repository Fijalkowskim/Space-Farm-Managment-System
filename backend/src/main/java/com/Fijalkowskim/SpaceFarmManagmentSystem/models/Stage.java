package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@Entity
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "typeId")
    private StageType stageType;

    private Date startStageDate;

    private Date finishStageDate;

    @ManyToOne
    @JoinColumn(name = "cultivationId")
    private Cultivation cultivation;

    @OneToMany(mappedBy = "stage")
    private Set<Control> controls;

    @Nullable
    private String comment;

    public Stage(){}

    public Stage(Long id, StageType stageType, Date startStageDate, Date finishStageDate, Cultivation cultivation) {
        this.id = id;
        this.stageType = stageType;
        this.startStageDate = startStageDate;
        this.finishStageDate = finishStageDate;
        this.cultivation = cultivation;
    }

    public Stage(Long id, StageType stageType, Date startStageDate, Date finishStageDate, Cultivation cultivation, Set<Control> controls, @Nullable String comment) {
        this.id = id;
        this.stageType = stageType;
        this.startStageDate = startStageDate;
        this.finishStageDate = finishStageDate;
        this.cultivation = cultivation;
        this.controls = controls;
        this.comment = comment;
    }
}
