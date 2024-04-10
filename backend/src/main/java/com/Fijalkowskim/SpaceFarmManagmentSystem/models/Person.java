package com.Fijalkowskim.SpaceFarmManagmentSystem.models;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.jdbc.Work;

import java.util.Set;

@Data
@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "role")
    private WorkerType role;

    @Column(name = "cultivations")
    @ManyToMany
    private Set<Cultivation> cultivations;




}
