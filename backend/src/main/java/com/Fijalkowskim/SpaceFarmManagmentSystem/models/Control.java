package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Set;


@Data
@Builder
@Entity
public class Control {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stageId")
    private Stage stage;

    private Date controlDate;

    private int deadSeedlings;

    @OneToMany(mappedBy = "control")
    private Set<Reading> readings;

    public Control() {}

    public Control(Long id, Stage stage, Date controlDate, int deadSeedlings) {
        this.id = id;
        this.stage = stage;
        this.controlDate = controlDate;
        this.deadSeedlings = deadSeedlings;
    }

    public Control(Long id, Stage stage, Date controlDate, int deadSeedlings, Set<Reading> readings) {
        this.id = id;
        this.stage = stage;
        this.controlDate = controlDate;
        this.deadSeedlings = deadSeedlings;
        this.readings = readings;
    }
}
