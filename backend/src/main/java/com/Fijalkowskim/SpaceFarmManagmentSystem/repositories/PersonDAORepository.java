package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface PersonDAORepository extends JpaRepository<Person, Long> {
    Set<Person> findAllByCultivations_Id(long cultivationId);

    Optional<Person> findByLogin(String login);
}
