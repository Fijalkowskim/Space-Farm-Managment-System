package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StageTypeDAORepository extends JpaRepository<StageType, Long> {
}
