package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class MeasureUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "measureUnit")
    private Set<MeasuredValue> measuredValue;

}
