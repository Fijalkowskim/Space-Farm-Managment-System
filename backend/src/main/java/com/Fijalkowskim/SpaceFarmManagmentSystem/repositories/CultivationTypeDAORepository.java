package com.Fijalkowskim.SpaceFarmManagmentSystem.repositories;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CultivationTypeDAORepository extends JpaRepository<CultivationType, Long> {
    @Query("SELECT ct FROM CultivationType ct WHERE ct.id = :id")
    CultivationType findByIdWithEagerLoading(Long id);
}
