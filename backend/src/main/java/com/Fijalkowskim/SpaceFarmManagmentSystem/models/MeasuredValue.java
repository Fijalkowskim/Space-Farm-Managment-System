package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "measuredValue")
public class MeasuredValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "measureUnit")
    private MeasureUnit measureUnit;

    @ManyToOne
    @JoinColumn(name = "readingId")
    private Reading reading;
}
