package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "harvest")
public class Harvest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "harvestDate")
    private Date harvestDate;

    @ManyToOne
    @JoinColumn(name = "cultivationId")
    private Cultivation cultivation;

    @Column(name = "successfulHarvest")
    private int successfulHarvest;

    @Column(name = "unSuccessfulHarvest")
    private int unSuccessfulHarvest;

}
