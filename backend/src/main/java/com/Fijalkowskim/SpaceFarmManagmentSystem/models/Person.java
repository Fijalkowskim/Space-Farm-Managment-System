package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Builder
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

    public Person() {
    }

    public Person(Long id, String name, String surname, String login, String password, WorkerType role, Set<Cultivation> cultivations) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.password = password;
        this.role = role;
        this.cultivations = cultivations;
    }

}
