package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CultivationTypeDAORepository extends JpaRepository<CultivationType, Long> {
}
