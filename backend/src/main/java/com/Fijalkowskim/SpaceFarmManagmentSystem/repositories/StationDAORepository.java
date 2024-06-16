package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface StationDAORepository extends JpaRepository<Station, Long> {
    @Query("SELECT s FROM Station s JOIN s.cultivations c WHERE c.id = :id")
    Set<Station> findAllByCultivationId(@Param("id") Long id);

    @Query("SELECT s FROM Station s JOIN s.cultivations c WHERE c.id = :id")
    Optional<Station> findByCultivationId(long id);
}
