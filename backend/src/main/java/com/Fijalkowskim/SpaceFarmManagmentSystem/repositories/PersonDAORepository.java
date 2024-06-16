package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface PersonDAORepository extends JpaRepository<Person, Long> {
    Set<Person> findAllByCultivations_Id(long cultivationId);

    Optional<Person> findByLogin(String login);

    @Query("SELECT p FROM Person p JOIN p.cultivations c WHERE c.id = :id")
    Optional<Person> findByCultivationId(long id);
}
