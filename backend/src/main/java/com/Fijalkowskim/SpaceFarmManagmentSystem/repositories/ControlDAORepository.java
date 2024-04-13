package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ControlDAORepository extends JpaRepository<Control, Long> {
}
