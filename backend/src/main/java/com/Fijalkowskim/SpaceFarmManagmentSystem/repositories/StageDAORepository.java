package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StageDAORepository extends JpaRepository<Stage, Long> {
}
