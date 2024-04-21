package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
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
}
