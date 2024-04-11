package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Reading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @OneToMany(mappedBy = "reading")
    private Set<MeasuredValue> measuredValues;

    private int value;

    @ManyToOne
    @JoinColumn(name = "controlId")
    private Control control;
}
