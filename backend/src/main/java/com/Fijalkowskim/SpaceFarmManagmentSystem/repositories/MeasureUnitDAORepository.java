package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MeasureUnitDAORepository extends JpaRepository<MeasureUnit, Long> {
    @Query("SELECT mu FROM MeasureUnit mu WHERE mu.id = :id")
    MeasureUnit findByIdWithEagerLoading(@Param("id") Long id);
}
