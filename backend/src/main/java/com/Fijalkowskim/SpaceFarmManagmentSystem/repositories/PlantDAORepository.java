package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlantDAORepository extends JpaRepository<Plant, Long> {
    @Query("SELECT p FROM Plant p WHERE p.id = :id")
    Plant findByIdWithEagerLoading(Long id);
}
