package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.PlantDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PlantServiceImpl implements PlantService {
    private final PlantDAORepository plantDAORepository;

    @Autowired
    public PlantServiceImpl(PlantDAORepository plantDAORepository) {
        this.plantDAORepository = plantDAORepository;
    }
}
