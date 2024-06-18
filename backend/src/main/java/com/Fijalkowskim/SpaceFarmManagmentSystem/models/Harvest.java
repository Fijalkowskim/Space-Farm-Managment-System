package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@Entity
public class Harvest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date harvestDate;

    @ManyToOne
    @JoinColumn(name = "cultivationId")
    @JsonIgnore
    private Cultivation cultivation;

    private Boolean successfulHarvest;

    @Nullable
    private String comment;

    public Harvest() {}

    public Harvest(Long id, Date harvestDate, Cultivation cultivation, Boolean successfulHarvest) {
        this.id = id;
        this.harvestDate = harvestDate;
        this.cultivation = cultivation;
        this.successfulHarvest = successfulHarvest;
    }

    public Harvest(Long id, Date harvestDate, Cultivation cultivation, Boolean successfulHarvest, @Nullable String comment) {
        this.id = id;
        this.harvestDate = harvestDate;
        this.cultivation = cultivation;
        this.successfulHarvest = successfulHarvest;
        this.comment = comment;
    }
}
