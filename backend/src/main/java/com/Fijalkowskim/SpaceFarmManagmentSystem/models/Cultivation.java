package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "cultivation")
public class Cultivation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "startDate")
    private Date startDate;

    @Column(name = "type")
    private CultivationType type;


    @OneToMany(mappedBy = "cultivation")
    private Set<Harvest> harvests;

    @OneToMany(mappedBy = "cultivation")
    private Set<Plant> plants;

    @OneToMany(mappedBy = "cultivation")
    private Set<Stage> stages;

    @Column(name = "stations")
    @ManyToMany
    private Set<Station> stations;

    @Column(name = "area")
    private float area;

    @Column(name = "plannedFinishDate")
    private Date plannedFinishDate;

    @Column(name = "realFinishDate")
    private Date realFinishDate;

    @Column(name = "responsibleWorkers")
    @ManyToMany
    private Set<Person> responsibleWorkers;




}
