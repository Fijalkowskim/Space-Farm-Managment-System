package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingDAORepository extends JpaRepository<Reading, Long> {
    Page<Reading> findReadingByControl(Control control, Pageable pageable);
}
