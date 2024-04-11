package com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries;


import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CultivationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToOne(mappedBy = "type")
    private Cultivation cultivation;
}
