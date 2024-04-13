package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonDAORepository extends JpaRepository<Person, Long> {
}
