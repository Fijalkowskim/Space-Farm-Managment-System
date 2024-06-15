package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@Entity
@Builder
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

    private Date realFinishDate;

    @ManyToOne
    @JoinColumn(name = "plantId")
    private Plant plant;

    @OneToMany(mappedBy = "cultivation")
    private Set<Stage> stages;

    @OneToMany(mappedBy = "cultivation")
    private Set<Harvest> harvests;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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
    @JsonIgnore
    private Set<Person> responsibleWorkers;

    @Nullable
    private String comment;


    public Cultivation() {

    }

    public Cultivation(Long id, Date startDate, CultivationType type, float area, Date plannedFinishDate, Date realFinishDate, Plant plant) {
        this.id = id;
        this.startDate = startDate;
        this.type = type;
        this.area = area;
        this.plannedFinishDate = plannedFinishDate;
        this.realFinishDate = realFinishDate;
        this.plant = plant;
    }

    public Cultivation(Long id, Date startDate, CultivationType type, float area, Date plannedFinishDate, Date realFinishDate, Plant plant, @Nullable String comment) {
        this.id = id;
        this.startDate = startDate;
        this.type = type;
        this.area = area;
        this.plannedFinishDate = plannedFinishDate;
        this.realFinishDate = realFinishDate;
        this.plant = plant;
        this.comment = comment;
    }


    public Cultivation(Long id, Date startDate, CultivationType type, float area, Date plannedFinishDate, Date realFinishDate, Plant plant, Set<Stage> stages, Set<Harvest> harvests, Set<Station> stations, Set<Person> responsibleWorkers, @Nullable String comment) {
        this.id = id;
        this.startDate = startDate;
        this.type = type;
        this.area = area;
        this.plannedFinishDate = plannedFinishDate;
        this.realFinishDate = realFinishDate;
        this.plant = plant;
        this.stages = stages;
        this.harvests = harvests;
        this.stations = stations;
        this.responsibleWorkers = responsibleWorkers;
        this.comment = comment;
    }
}
