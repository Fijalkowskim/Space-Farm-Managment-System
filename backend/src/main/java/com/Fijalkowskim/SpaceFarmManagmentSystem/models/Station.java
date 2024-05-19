package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import java.util.Set;

@Data
@Entity
@Builder
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "stations")
    private Set<Cultivation> cultivations;

    public Station(){
    }

    public Station(Long id){
        this.id = id;
    }

    public Station(Long id, Set<Cultivation> cultivations){
        this.id = id;
        this.cultivations = cultivations;
    }
}
