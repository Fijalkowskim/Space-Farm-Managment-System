package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface StageDAORepository extends JpaRepository<Stage, Long> {
    @Query("SELECT s FROM Stage s LEFT JOIN FETCH s.stageType WHERE s.id = :id")
    Stage findByIdWithEagerLoading(@Param("id") Long id);

    @Query("SELECT s FROM Stage s WHERE s.id = :id")
    Optional<Stage> findByStageId(long id);

    @Query("SELECT s FROM Stage s JOIN s.cultivation c WHERE c.id = :cultivationId")
    Set<Stage> findAllByCultivationId(@Param("cultivationId") long cultivationId);

    @Query("SELECT s FROM Stage s JOIN s.cultivation c WHERE c.id = :cultivationId")
    Optional<Stage> findByCultivationId(@Param("cultivationId") long cultivationId);
}
