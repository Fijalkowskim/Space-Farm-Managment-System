package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}
