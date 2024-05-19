package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Builder
public class MeasuredValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "unitId")
    private MeasureUnit measureUnit;

    @OneToMany(mappedBy = "measuredValue")
    private Set<Reading> readings;

    public MeasuredValue() {
    }

    public MeasuredValue(Long id, String name, MeasureUnit measureUnit) {
        this.id = id;
        this.name = name;
        this.measureUnit = measureUnit;
    }

    public MeasuredValue(Long id, String name, MeasureUnit measureUnit, Set<Reading> readings) {
        this.id = id;
        this.name = name;
        this.measureUnit = measureUnit;
        this.readings = readings;
    }
}
