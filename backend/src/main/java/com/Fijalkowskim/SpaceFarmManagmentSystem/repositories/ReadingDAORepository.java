package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReadingDAORepository extends JpaRepository<Reading, Long> {
    Page<Reading> findReadingByControl(Control control, Pageable pageable);

    @Query("SELECT r FROM Reading r WHERE r.measuredValue.id = :id")
    Optional<Reading> findByMeasureValueId(Long id);
}
