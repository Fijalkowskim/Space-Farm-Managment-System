package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.PlantDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PlantRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;

@Transactional
@Service
public class PlantServiceImpl implements PlantService {
    private final PlantDAORepository plantDAORepository;
    private final CultivationDAORepository cultivationDAORepository;

    @Autowired
    public PlantServiceImpl(PlantDAORepository plantDAORepository, CultivationDAORepository cultivationDAORepository) {
        this.plantDAORepository = plantDAORepository;
        this.cultivationDAORepository = cultivationDAORepository;
    }

    public Page<Plant> getPlants(Pageable pageable){
        return plantDAORepository.findAll(pageable);
    }
    public Plant getPlantById(Long plantId) throws CustomHTTPException {
        Optional<Plant> Plant = plantDAORepository.findById(plantId);
        if(Plant.isEmpty()) throw new CustomHTTPException("Plant not found", HttpStatus.NOT_FOUND);
        return Plant.get();
    }
    public Plant addPlant(PlantRequest plantRequest) throws CustomHTTPException {
        Plant plant = Plant.builder()
                .name(plantRequest.getName())
                .cultivations(new HashSet<>())
                .build();
        return plantDAORepository.save(plant);
    }
    public Plant updatePlant(long id, PlantRequest plantRequest) throws CustomHTTPException {
        Optional<Plant> oldPlant = plantDAORepository.findById(id);
        if(oldPlant.isEmpty()) throw new CustomHTTPException("Plant not found", HttpStatus.NOT_FOUND);
        Plant newPlant = Plant.builder()
                .name(plantRequest.getName())
                .cultivations(new HashSet<>())
                .id(oldPlant.get().getId())
                .build();
        return plantDAORepository.save(newPlant);
    }
    public void deletePlant(Long id) throws CustomHTTPException {
        Optional<Plant> plant = plantDAORepository.findById(id);
        Optional<Cultivation> cultivation = cultivationDAORepository.findCultivationPlantById(id);
        if(cultivation.isPresent()){
            throw new CustomHTTPException("Plant assigned to cultivation", HttpStatus.FOUND);
        }
        if(plant.isEmpty()) throw new CustomHTTPException("Plant not found", HttpStatus.NOT_FOUND);
        plantDAORepository.delete(plant.get());
    }
}
