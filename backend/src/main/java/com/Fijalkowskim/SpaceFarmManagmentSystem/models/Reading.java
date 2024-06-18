package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.repository.cdi.Eager;


@Data
@Entity
@Builder
public class
Reading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "measuredValueId")
    private MeasuredValue measuredValue;

    private int value;

    @ManyToOne
    @JoinColumn(name = "controlId")
    private Control control;

    public Reading() {

    }
    public Reading(Long id, MeasuredValue measuredValue, int value, Control control){
        this.id = id;
        this.measuredValue = measuredValue;
        this.value = value;
        this.control = control;
    }
}
