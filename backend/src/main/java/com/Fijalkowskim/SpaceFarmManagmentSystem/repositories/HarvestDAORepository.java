package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Harvest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface HarvestDAORepository extends JpaRepository<Harvest, Long> {
    @Query("SELECT h FROM Harvest h JOIN h.cultivation c WHERE c.id = :cultivationId")
    Set<Harvest> findAllByCultivationId(@Param("cultivationId") long cultivationId);

    @Query("SELECT h FROM Harvest h JOIN h.cultivation c WHERE c.id = :cultivationId")
    Optional<Harvest> findByCultivationId(@Param("cultivationId") long cultivationId);
}
