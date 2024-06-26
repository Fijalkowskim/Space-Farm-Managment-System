package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CultivationDAORepository  extends JpaRepository<Cultivation, Long> {
    @Query("SELECT ct FROM Cultivation ct WHERE ct.id = :id")
    Cultivation findByIdWithEagerLoading(Long id);

    @Query("SELECT COUNT(crw) > 0 FROM Cultivation c " +
            "JOIN c.responsibleWorkers crw " +
            "WHERE c.id = :cultivationId AND crw.id = :personId")
    boolean existsByCultivationIdAndPersonId(@Param("cultivationId") Long cultivationId, @Param("personId") Long personId);

    @Query("SELECT c FROM Cultivation c JOIN c.responsibleWorkers rw WHERE rw.id = :workerId")
    Set<Cultivation> findAllByWorkerId(@Param("workerId") long workerId);

    @Query("SELECT c FROM Cultivation c JOIN c.stations s WHERE s.id = :stationId")
    Set<Cultivation> findAllByStationId(@Param("stationId") long stationId);

    @Query("SELECT c FROM Cultivation c WHERE c.realFinishDate IS NULL")
    Set<Cultivation> findAllActiveCultivations();

    @Query("SELECT c FROM Cultivation c WHERE c.realFinishDate IS NOT NULL")
    Set<Cultivation> findAllFinishedCultivations();

    @Query("SELECT s FROM Stage s WHERE s.cultivation.id = :id")
    Optional<Cultivation> findCultivationStageById(long id);

    @Query("SELECT h FROM Harvest h WHERE h.cultivation.id = :id")
    Optional<Cultivation> findCultivationHarvestById(long id);

    @Query("SELECT c FROM Cultivation c WHERE c.plant.id = :id")
    Optional<Cultivation> findCultivationPlantById(Long id);

    @Query("SELECT c FROM Cultivation c JOIN c.responsibleWorkers p WHERE p.id = :id")
    Optional<Cultivation> findByPersonId(long id);

    @Query("SELECT c FROM Cultivation c JOIN c.stations s WHERE s.id = :id")
    Optional<Cultivation> findCultivationStationById(Long id);
}
