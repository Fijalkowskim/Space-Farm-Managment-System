package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@Entity
public class Cultivation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date startDate;

    @ManyToOne
    @JoinColumn(name = "typeId")
    private CultivationType type;

    @OneToMany(mappedBy = "cultivation")
    private Set<Harvest> harvests;

    @ManyToOne
    @JoinColumn(name = "plantId")
    private Plant plant;

    @OneToMany(mappedBy = "cultivation")
    private Set<Stage> stages;

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "cultivationId"),
            inverseJoinColumns = @JoinColumn(name = "stationId")
    )
    private Set<Station> stations;

    private float area;

    private Date plannedFinishDate;

    private Date realFinishDate;

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "cultivationId"),
            inverseJoinColumns = @JoinColumn(name = "workerId")
    )
    private Set<Person> responsibleWorkers;

    @Nullable
    private String comment;




}
