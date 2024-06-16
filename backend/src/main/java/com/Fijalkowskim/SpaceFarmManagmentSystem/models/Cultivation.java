package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
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

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            joinColumns = @JoinColumn(name = "cultivationId"),
            inverseJoinColumns = @JoinColumn(name = "stationId")
    )
    private Set<Station> stations = new HashSet<>();

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "cultivationId"),
            inverseJoinColumns = @JoinColumn(name = "workerId")
    )
    @JsonIgnore
    private Set<Person> responsibleWorkers;

    @Nullable
    private String comment;


    public void addStation(Station station) {
        this.stations.add(station);
        station.getCultivations().add(this);
    }

    public void removeStation(Long stationId) {
        Station station = this.stations.stream().filter(t -> t.getId() == stationId).findFirst().orElse(null);
        if (station != null) {
            this.stations.remove(station);
            station.getCultivations().remove(this);
        }
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cultivation that = (Cultivation) o;
        return Float.compare(area, that.area) == 0 && Objects.equals(id, that.id) && Objects.equals(startDate, that.startDate) && Objects.equals(type, that.type) && Objects.equals(plannedFinishDate, that.plannedFinishDate) && Objects.equals(realFinishDate, that.realFinishDate) && Objects.equals(plant, that.plant) && Objects.equals(stages, that.stages) && Objects.equals(harvests, that.harvests) && Objects.equals(comment, that.comment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, startDate, type, area, plannedFinishDate, realFinishDate, plant, stages, harvests, comment);
    }
}
