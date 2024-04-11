package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.Set;


@Data
@Entity
public class Control {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "stageId")
    private Stage stage;

    private Date controlDate;

    private int deadSeedlings;

    @OneToMany(mappedBy = "control")
    private Set<Reading> readings;
}
