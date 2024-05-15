package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;



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

    public Reading() {

    }
    public Reading(long id, MeasuredValue measuredValue, int value, Control control){
        this.id = id;
        this.measuredValue = measuredValue;
        this.value = value;
        this.control = control;
    }
}
