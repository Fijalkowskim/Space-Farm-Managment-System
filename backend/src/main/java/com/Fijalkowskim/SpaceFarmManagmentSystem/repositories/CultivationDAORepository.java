package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CultivationDAORepository  extends JpaRepository<Cultivation, Long> {
    @Query("SELECT COUNT(crw) > 0 FROM Cultivation c " +
            "JOIN c.responsibleWorkers crw " +
            "WHERE c.id = :cultivationId AND crw.id = :personId")
    boolean existsByCultivationIdAndPersonId(@Param("cultivationId") Long cultivationId, @Param("personId") Long personId);
}
