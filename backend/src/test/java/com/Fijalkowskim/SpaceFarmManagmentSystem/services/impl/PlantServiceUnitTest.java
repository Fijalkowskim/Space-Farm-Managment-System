package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.PlantDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PlantRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.PlantServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

public class PlantServiceUnitTest {

    @Mock
    private PlantDAORepository plantDAORepository;

    @InjectMocks
    private PlantServiceImpl plantService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetPlants() {
        // Mocking data
        Pageable pageable = PageRequest.of(0, 10);
        Plant plant = new Plant();
        plant.setId(1L);
        plant.setName("Tomato");
        Page<Plant> plantPage = new PageImpl<>(new ArrayList<>());
        when(plantDAORepository.findAll(pageable)).thenReturn(plantPage);

        // Assertions
        Page<Plant> result = plantService.getPlants(pageable);
        assertNotNull(result);
        assertEquals(plantPage, result);
    }

    @Test
    public void testGetPlantById_PlantExists() {
        // Mocking data
        long id = 1L;
        Plant plant = new Plant();
        plant.setId(id);
        when(plantDAORepository.findById(id)).thenReturn(Optional.of(plant));

        // Assertions
        Plant result = plantService.getPlantById(id);
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testGetPlantById_PlantNotFound() {
        // Mocking data
        long id = 1L;
        when(plantDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> plantService.getPlantById(id));
        assertEquals("Plant not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddPlant() {
        // Mocking data
        PlantRequest plantRequest = new PlantRequest();
        plantRequest.setName("Tomato");

        Plant plant = new Plant();
        plant.setName("Tomato");

        // Mocking repository behavior
        when(plantDAORepository.save(any(Plant.class))).thenReturn(plant);

        // Assertions
        assertDoesNotThrow(() -> plantService.addPlant(plantRequest));
    }

    @Test
    public void testUpdatePlant_PlantExists() {
        // Mocking data
        long id = 1L;
        PlantRequest plantRequest = new PlantRequest();
        plantRequest.setName("Tomato");

        Plant oldPlant = new Plant();
        oldPlant.setId(id);

        Plant newPlant = new Plant();
        newPlant.setId(id);
        newPlant.setName("Tomato");

        // Mocking repository behavior
        when(plantDAORepository.findById(id)).thenReturn(Optional.of(oldPlant));
        when(plantDAORepository.save(any(Plant.class))).thenReturn(newPlant);

        // Assertions
        assertDoesNotThrow(() -> plantService.updatePlant(id, plantRequest));
    }

    @Test
    public void testUpdatePlant_PlantNotFound() {
        // Mocking data
        long id = 1L;
        PlantRequest plantRequest = new PlantRequest();
        plantRequest.setName("Tomato");

        // Mocking repository behavior
        when(plantDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> plantService.updatePlant(id, plantRequest));
        assertEquals("Plant not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testDeletePlant_PlantExists() {
        // Mocking data
        long id = 1L;
        Plant plant = new Plant();
        plant.setId(id);

        // Mocking repository behavior
        when(plantDAORepository.findById(id)).thenReturn(Optional.of(plant));
        doNothing().when(plantDAORepository).delete(plant);

        // Assertions
        assertDoesNotThrow(() -> plantService.deletePlant(id));
    }

    @Test
    public void testDeletePlant_PlantNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(plantDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> plantService.deletePlant(id));
        assertEquals("Plant not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
