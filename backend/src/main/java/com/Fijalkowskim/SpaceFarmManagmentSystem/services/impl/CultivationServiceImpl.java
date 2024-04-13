package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.CultivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class CultivationServiceImpl implements CultivationService {
    private final CultivationDAORepository cultivationDAORepository;

    @Autowired
    public CultivationServiceImpl(CultivationDAORepository cultivationDAORepository) {
        this.cultivationDAORepository = cultivationDAORepository;
    }
}
