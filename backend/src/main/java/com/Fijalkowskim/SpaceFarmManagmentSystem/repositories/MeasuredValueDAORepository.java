package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeasuredValueDAORepository extends JpaRepository<MeasuredValue, Long> {
}
