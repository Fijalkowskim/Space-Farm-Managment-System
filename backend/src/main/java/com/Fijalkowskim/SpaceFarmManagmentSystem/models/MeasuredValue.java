package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class MeasuredValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "unitId")
    private MeasureUnit measureUnit;

    @OneToMany(mappedBy = "measuredValue")
    private Set<Reading> reading;
}
