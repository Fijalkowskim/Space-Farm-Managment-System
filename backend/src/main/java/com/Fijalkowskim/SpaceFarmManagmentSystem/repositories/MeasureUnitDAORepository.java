package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeasureUnitDAORepository extends JpaRepository<MeasureUnit, Long> {
}
