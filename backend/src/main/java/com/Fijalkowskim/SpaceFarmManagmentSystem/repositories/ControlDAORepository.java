package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ControlDAORepository extends JpaRepository<Control, Long> {
    Page<Control> findControlByStage(Stage stage, Pageable pageable);
}
