package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String surname;

    private String login;

    private String password;

    private WorkerType role;

    @ManyToMany(mappedBy = "responsibleWorkers")
    private Set<Cultivation> cultivations;

}
