package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.Set;


@Data
@Entity
@Table(name = "control")
public class Control {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "stageId")
    private Stage stage;

    @Column(name = "controlDate")
    private Date controlDate;

    @Column(name = "deadSeedlings")
    private int deadSeedlings;

    @OneToMany(mappedBy = "control")
    private Set<Reading> readings;
}
