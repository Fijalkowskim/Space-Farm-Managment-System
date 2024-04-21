package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;


import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class CultivationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "type")
    private Set<Cultivation> cultivations;
}
