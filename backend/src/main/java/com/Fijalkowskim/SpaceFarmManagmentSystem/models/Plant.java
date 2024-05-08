package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Builder
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "plant")
    private Set<Cultivation> cultivations;

    public Plant() {

    }
    public Plant(Long id, String name, Set<Cultivation> cultivations) {
        this.id = id;
        this.name = name;
        this.cultivations = cultivations;
    }
}
