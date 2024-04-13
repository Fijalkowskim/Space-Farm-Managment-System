package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Harvest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HarvestDAORepository extends JpaRepository<Harvest, Long> {
}
