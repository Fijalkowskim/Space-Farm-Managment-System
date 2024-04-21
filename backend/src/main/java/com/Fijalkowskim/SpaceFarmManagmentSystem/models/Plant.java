package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "plant")
    private Set<Cultivation> cultivation;
}
