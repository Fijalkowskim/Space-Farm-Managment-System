package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationDAORepository extends JpaRepository<Station, Long> {
}
