package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Harvest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date harvestDate;

    @ManyToOne
    @JoinColumn(name = "cultivationId")
    private Cultivation cultivation;

    private Boolean successfulHarvest;

    @Nullable
    private String comment;

}
