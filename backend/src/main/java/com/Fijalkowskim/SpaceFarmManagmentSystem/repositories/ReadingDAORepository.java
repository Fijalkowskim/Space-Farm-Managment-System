package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingDAORepository extends JpaRepository<Reading, Long> {
}
