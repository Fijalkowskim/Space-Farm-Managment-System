package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
@Entity
public class
Reading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "measuredValueId")
    private MeasuredValue measuredValue;

    private int value;

    @ManyToOne
    @JoinColumn(name = "controlId")
    private Control control;

    public Reading(){}
}
