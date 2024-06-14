package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Station;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StationDAORepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class StationServiceUnitTest {

    @Mock
    private StationDAORepository stationDAORepository;

    @InjectMocks
    private StationServiceImpl stationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetStations() {
        // Mocking data
        Pageable pageable = Pageable.unpaged();
        Page<Station> expectedPage = Page.empty(); // Replace with your mocked Page

        when(stationDAORepository.findAll(pageable)).thenReturn(expectedPage);

        // Assertions
        Page<Station> result = stationService.getStations(pageable);
        assertNotNull(result);
        assertEquals(expectedPage, result);
    }

    @Test
    public void testGetStationById_Exists() {
        // Mocking data
        long id = 1L;
        Station station = new Station();
        station.setId(id);
        when(stationDAORepository.findById(id)).thenReturn(Optional.of(station));

        // Assertions
        Station result = assertDoesNotThrow(() -> stationService.getStationById(id));
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testGetStationById_NotFound() {
        // Mocking data
        long id = 1L;
        when(stationDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stationService.getStationById(id));
        assertEquals("Station not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddStation() {
        // Mocking data
        Station savedStation = new Station();
        savedStation.setId(1L);

        when(stationDAORepository.save(any(Station.class))).thenReturn(savedStation);

        // Assertions
        Station result = assertDoesNotThrow(() -> stationService.addStation());
        assertNotNull(result);
        assertEquals(savedStation.getId(), result.getId());
    }

    @Test
    public void testDeleteStation_Exists() {
        // Mocking data
        long id = 1L;
        Station station = new Station();
        station.setId(id);

        when(stationDAORepository.findById(id)).thenReturn(Optional.of(station));
        doNothing().when(stationDAORepository).delete(station);

        // Assertions
        assertDoesNotThrow(() -> stationService.deleteStation(id));
    }

    @Test
    public void testDeleteStation_NotFound() {
        // Mocking data
        long id = 1L;

        when(stationDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stationService.deleteStation(id));
        assertEquals("Station not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testUpdateStation_Exists() {
        // Mocking data
        long id = 1L;
        Station existingStation = new Station();
        existingStation.setId(id);

        when(stationDAORepository.findById(id)).thenReturn(Optional.of(existingStation));
        when(stationDAORepository.save(any(Station.class))).thenReturn(existingStation);

        // Assertions
        Station result = assertDoesNotThrow(() -> stationService.updateStation(id));
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testUpdateStation_NotFound() {
        // Mocking data
        long id = 1L;

        when(stationDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stationService.updateStation(id));
        assertEquals("Station not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}