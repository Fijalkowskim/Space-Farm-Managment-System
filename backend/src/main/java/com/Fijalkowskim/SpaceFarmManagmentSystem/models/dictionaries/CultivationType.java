package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;


import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Builder
public class CultivationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "type")
    private Set<Cultivation> cultivations;

    public CultivationType() {
    }

    public CultivationType(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public CultivationType(long id, String name, Set<Cultivation> cultivations) {
        this.id = id;
        this.name = name;
        this.cultivations = cultivations;
    }
}
