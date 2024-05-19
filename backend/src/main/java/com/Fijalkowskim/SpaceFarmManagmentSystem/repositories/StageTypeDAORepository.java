package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StageTypeDAORepository extends JpaRepository<StageType, Long> {
    @Query("SELECT st FROM StageType st WHERE st.id = :id")
    StageType findByIdWithEagerLoading(Long id);
}
