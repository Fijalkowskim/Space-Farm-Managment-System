package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "reading")
public class Reading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;


    @OneToMany(mappedBy = "reading")
    private Set<MeasuredValue> measuredValues;

    @Column(name = "value")
    private int value;

    @ManyToOne
    @JoinColumn(name = "controlId")
    private Control control;
}
