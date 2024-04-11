package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MeasuredValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToOne
    @JoinColumn(name = "unitId")
    private MeasureUnit measureUnit;

    @ManyToOne
    @JoinColumn(name = "readingId")
    private Reading reading;
}
