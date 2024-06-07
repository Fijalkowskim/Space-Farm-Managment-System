package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Harvest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.HarvestDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.HarvestRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HarvestServiceUnitTest {
    @Mock
    private HarvestDAORepository harvestDAORepository;

    @Mock
    private CultivationDAORepository cultivationDAORepository;

    @InjectMocks
    private HarvestServiceImpl harvestService;

    @Test
    public void testGetHarvests() {
        // Mocking data
        PageRequest pageRequest = PageRequest.of(0, 10);
        Harvest harvest = new Harvest();
        Page<Harvest> harvestPage = new PageImpl<>(Collections.singletonList(harvest));

        // Mocking repository behavior
        when(harvestDAORepository.findAll(pageRequest)).thenReturn(harvestPage);

        // Assertions
        Page<Harvest> result = harvestService.getHarvests(pageRequest);
        assertEquals(1, result.getTotalElements());
    }

    @Test
    public void testGetHarvestById_HarvestExists() {
        // Mocking data
        long id = 1L;
        Harvest harvest = new Harvest();
        harvest.setId(id);

        // Mocking repository behavior
        when(harvestDAORepository.findById(id)).thenReturn(Optional.of(harvest));

        // Assertions
        Harvest result = harvestService.getHarvestById(id);
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testGetHarvestById_HarvestNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(harvestDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () ->
                harvestService.getHarvestById(id));
        assertEquals("Harvest not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
    @Test
    public void testAddHarvest() {
        // Mocking data
        HarvestRequest harvestRequest = new HarvestRequest();
        harvestRequest.setCultivationId(1L);

        Cultivation cultivation = new Cultivation();
        cultivation.setId(1L);
        cultivation.setHarvests(new HashSet<>()); // Ensure the set is not null

        Harvest harvest = new Harvest();
        harvest.setCultivation(cultivation);

        // Mocking repository behavior
        when(cultivationDAORepository.findById(harvestRequest.getCultivationId())).thenReturn(Optional.of(cultivation));
        when(harvestDAORepository.save(any(Harvest.class))).thenReturn(harvest);

        // Assertions
        assertDoesNotThrow(() -> harvestService.addHarvest(harvestRequest));
    }

    @Test
    public void testUpdateHarvest_HarvestExists() {
        // Mocking data
        long id = 1L;
        HarvestRequest harvestRequest = new HarvestRequest();
        harvestRequest.setCultivationId(1L);

        Harvest oldHarvest = new Harvest();
        oldHarvest.setId(id);

        Cultivation cultivation = new Cultivation();
        cultivation.setId(1L);

        Harvest newHarvest = new Harvest();
        newHarvest.setId(id);
        newHarvest.setCultivation(cultivation);

        // Mocking repository behavior
        when(harvestDAORepository.findById(id)).thenReturn(Optional.of(oldHarvest));
        when(cultivationDAORepository.findById(harvestRequest.getCultivationId())).thenReturn(Optional.of(cultivation));
        when(harvestDAORepository.save(any(Harvest.class))).thenReturn(newHarvest);

        // Assertions
        assertDoesNotThrow(() -> harvestService.updateHarvest(id, harvestRequest));
    }

    @Test
    public void testUpdateHarvest_HarvestNotFound() {
        // Mocking data
        long id = 1L;
        HarvestRequest harvestRequest = new HarvestRequest();
        harvestRequest.setCultivationId(1L);

        // Mocking repository behavior
        when(harvestDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () ->
                harvestService.updateHarvest(id, harvestRequest));
        assertEquals("Harvest not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testDeleteHarvest_HarvestExists() {
        // Mocking data
        long id = 1L;
        Harvest harvest = new Harvest();

        // Mocking repository behavior
        when(harvestDAORepository.findById(id)).thenReturn(Optional.of(harvest));

        // Assertions
        assertDoesNotThrow(() -> harvestService.deleteHarvest(id));
    }

    @Test
    public void testDeleteHarvest_HarvestNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(harvestDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () ->
                harvestService.deleteHarvest(id));
        assertEquals("Harvest not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

}
