package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageTypeDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageTypeRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class StageTypeServiceUnitTest {
    @Mock
    private StageTypeDAORepository stageTypeDAORepository;

    @InjectMocks
    private StageTypeServiceImpl stageTypeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllStageTypes() {
        // Mocking data
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<StageType> expectedPage = Page.empty(); // Replace with your mocked Page

        when(stageTypeDAORepository.findAll(pageRequest)).thenReturn(expectedPage);

        // Assertions
        Page<StageType> result = stageTypeService.getAllStageTypes(pageRequest);
        assertNotNull(result);
        assertEquals(expectedPage, result);
    }

    @Test
    public void testGetStageTypeById_Exists() {
        // Mocking data
        long id = 1L;
        StageType stageType = new StageType();
        stageType.setId(id);
        when(stageTypeDAORepository.findById(id)).thenReturn(Optional.of(stageType));

        // Assertions
        StageType result = assertDoesNotThrow(() -> stageTypeService.getStageTypeById(id));
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testGetStageTypeById_NotFound() {
        // Mocking data
        long id = 1L;
        when(stageTypeDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageTypeService.getStageTypeById(id));
        assertEquals("Stage type not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddStageType() {
        // Mocking data
        StageTypeRequest stageTypeRequest = new StageTypeRequest();
        stageTypeRequest.setName("Test StageType");

        StageType savedStageType = new StageType();
        savedStageType.setId(1L);
        savedStageType.setName(stageTypeRequest.getName());

        when(stageTypeDAORepository.save(any(StageType.class))).thenReturn(savedStageType);

        // Assertions
        StageType result = assertDoesNotThrow(() -> stageTypeService.addStageType(stageTypeRequest));
        assertNotNull(result);
        assertEquals(savedStageType.getName(), result.getName());
    }

    @Test
    public void testUpdateStageType_Exists() {
        // Mocking data
        long id = 1L;
        StageTypeRequest stageTypeRequest = new StageTypeRequest();
        stageTypeRequest.setName("Updated StageType");

        StageType existingStageType = new StageType();
        existingStageType.setId(id);
        existingStageType.setName("Old StageType");

        when(stageTypeDAORepository.findById(id)).thenReturn(Optional.of(existingStageType));
        when(stageTypeDAORepository.save(any(StageType.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Assertions
        StageType updatedStageType = assertDoesNotThrow(() -> stageTypeService.updateStageType(id, stageTypeRequest));
        assertNotNull(updatedStageType);
        assertEquals(id, updatedStageType.getId());
        assertEquals(stageTypeRequest.getName(), updatedStageType.getName());
    }

    @Test
    public void testUpdateStageType_NotFound() {
        // Mocking data
        long id = 1L;
        StageTypeRequest stageTypeRequest = new StageTypeRequest();
        stageTypeRequest.setName("Updated StageType");

        when(stageTypeDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageTypeService.updateStageType(id, stageTypeRequest));
        assertEquals("Stage type not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testDeleteStageType_Exists() {
        // Mocking data
        long id = 1L;
        StageType stageType = new StageType();
        stageType.setId(id);

        when(stageTypeDAORepository.findById(id)).thenReturn(Optional.of(stageType));
        doNothing().when(stageTypeDAORepository).delete(stageType);

        // Assertions
        assertDoesNotThrow(() -> stageTypeService.deleteStageType(id));
    }

    @Test
    public void testDeleteStageType_NotFound() {
        // Mocking data
        long id = 1L;

        when(stageTypeDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageTypeService.deleteStageType(id));
        assertEquals("Stage type not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

}
