package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CultivationDAORepository  extends JpaRepository<Cultivation, Long> {
}
