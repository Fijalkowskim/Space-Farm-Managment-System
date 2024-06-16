package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MeasuredValueDAORepository extends JpaRepository<MeasuredValue, Long> {
    @Query("SELECT mv FROM MeasuredValue mv LEFT JOIN FETCH mv.measureUnit WHERE mv.id = :id")
    MeasuredValue findByIdWithEagerLoading(@Param("id") Long id);

    @Query("SELECT mv FROM MeasuredValue mv WHERE mv.measureUnit.id = :unitId")
    Optional<MeasuredValue> findByUnitId(long unitId);
}
