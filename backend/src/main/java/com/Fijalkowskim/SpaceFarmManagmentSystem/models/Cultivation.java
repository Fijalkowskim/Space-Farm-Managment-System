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

    private float area;

    private Date plannedFinishDate;
""
    private Date realFinishDate;

    @ManyToOne
    @JoinColumn(name = "plantId")
    private Plant plant;

    @OneToMany(mappedBy = "cultivation")
    private Set<Stage> stages;

    @OneToMany(mappedBy = "cultivation")
    private Set<Harvest> harvests;

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "cultivationId"),
            inverseJoinColumns = @JoinColumn(name = "stationId")
    )
    private Set<Station> stations;

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "cultivationId"),
            inverseJoinColumns = @JoinColumn(name = "workerId")
    )
    private Set<Person> responsibleWorkers;

    @Nullable
    private String comment;




}
