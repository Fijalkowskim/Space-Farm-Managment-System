package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantDAORepository extends JpaRepository<Plant, Long> {
}
