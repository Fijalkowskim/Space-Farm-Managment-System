package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ControlDAORepository extends JpaRepository<Control, Long> {
    Page<Control> findControlByStage(Stage stage, Pageable pageable);
    @Query("SELECT c FROM Control c LEFT JOIN FETCH c.stage WHERE c.id = :id")
    Control findByIdWithEagerLoading(@Param("id") Long id);


    @Query("SELECT r FROM Reading r WHERE r.control.id = :id")
    Optional<Control> findByReadingId(long id);
}
