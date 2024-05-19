package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Builder
public class MeasureUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "measureUnit")
    private Set<MeasuredValue> measuredValues;

    public MeasureUnit() {
    }

    public MeasureUnit(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public MeasureUnit(long id, String name, Set<MeasuredValue> measuredValues) {
        this.id = id;
        this.name = name;
        this.measuredValues = measuredValues;
    }
}
