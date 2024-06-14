package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class StageServiceUnitTest {

    @Mock
    private StageDAORepository stageDAORepository;

    @Mock
    private CultivationDAORepository cultivationDAORepository;

    @Mock
    private ControlDAORepository controlDAORepository;

    @InjectMocks
    private StageServiceImpl stageService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDeleteStage_StageExists() {
        // Mocking data
        long id = 1L;
        Stage stage = new Stage();
        stage.setId(id);
        stage.setCultivation(new Cultivation());

        when(stageDAORepository.findById(id)).thenReturn(Optional.of(stage));
        doNothing().when(stageDAORepository).deleteById(id);

        // Assertions
        assertDoesNotThrow(() -> stageService.deleteStage(id));
        verify(stageDAORepository, times(1)).deleteById(id);
    }

    @Test
    public void testDeleteStage_StageNotFound() {
        // Mocking data
        long id = 1L;

        when(stageDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageService.deleteStage(id));
        assertEquals("Stage not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(stageDAORepository, never()).deleteById(id);
    }

    @Test
    public void testUpdateStage_StageExists() {
        // Mocking data
        long id = 1L;
        StageRequest stageRequest = createStageRequest();
        Stage existingStage = createStage(id);

        when(stageDAORepository.findById(id)).thenReturn(Optional.of(existingStage));
        when(stageDAORepository.save(any(Stage.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Assertions
        Stage updatedStage = assertDoesNotThrow(() -> stageService.updateStage(id, stageRequest));
        assertNotNull(updatedStage);
        assertEquals(id, updatedStage.getId());
        assertEquals(stageRequest.getStageType(), updatedStage.getStageType());
        assertEquals(stageRequest.getStartStageDate(), updatedStage.getStartStageDate());
        assertEquals(stageRequest.getFinishStageDate(), updatedStage.getFinishStageDate());
        assertEquals(stageRequest.getComment(), updatedStage.getComment());
    }

    @Test
    public void testUpdateStage_StageNotFound() {
        // Mocking data
        long id = 1L;
        StageRequest stageRequest = createStageRequest();

        when(stageDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageService.updateStage(id, stageRequest));
        assertEquals("Stage not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddStage_CultivationExists() {
        // Mocking data
        StageRequest stageRequest = createStageRequest();
        Cultivation cultivation = new Cultivation();
        cultivation.setId(stageRequest.getCultivationId());
        cultivation.setStages(new HashSet<>());

        when(cultivationDAORepository.findById(stageRequest.getCultivationId())).thenReturn(Optional.of(cultivation));
        when(stageDAORepository.save(any(Stage.class))).thenAnswer(invocation -> {
            Stage savedStage = invocation.getArgument(0);
            savedStage.setId(1L); // Simulate saving stage and setting ID
            return savedStage;
        });

        // Assertions
        Stage addedStage = assertDoesNotThrow(() -> stageService.addStage(stageRequest));
        assertNotNull(addedStage);
        assertEquals(stageRequest.getStageType(), addedStage.getStageType());
        assertEquals(stageRequest.getStartStageDate(), addedStage.getStartStageDate());
        assertEquals(stageRequest.getFinishStageDate(), addedStage.getFinishStageDate());
        assertEquals(stageRequest.getComment(), addedStage.getComment());
        assertEquals(cultivation, addedStage.getCultivation());
    }

    @Test
    public void testAddStage_CultivationNotFound() {
        // Mocking data
        StageRequest stageRequest = createStageRequest();

        when(cultivationDAORepository.findById(stageRequest.getCultivationId())).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageService.addStage(stageRequest));
        assertEquals("Cultivation not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testGetStageById_StageExists() {
        // Mocking data
        long id = 1L;
        Stage stage = createStage(id);

        when(stageDAORepository.findById(id)).thenReturn(Optional.of(stage));

        // Assertions
        Stage retrievedStage = assertDoesNotThrow(() -> stageService.getStageById(id));
        assertNotNull(retrievedStage);
        assertEquals(id, retrievedStage.getId());
    }

    @Test
    public void testGetStageById_StageNotFound() {
        // Mocking data
        long id = 1L;

        when(stageDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageService.getStageById(id));
        assertEquals("Stage not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testGetStages() {
        // Mocking data
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<Stage> expectedPage = Page.empty(); // Replace with your mocked Page

        when(stageDAORepository.findAll(pageRequest)).thenReturn(expectedPage);

        // Assertions
        Page<Stage> retrievedPage = stageService.getStages(pageRequest);
        assertNotNull(retrievedPage);
        assertEquals(expectedPage, retrievedPage);
    }

    @Test
    public void testGetControlsByStage_StageExists() {
        // Mocking data
        long stageId = 1L;
        Pageable pageable = PageRequest.of(0, 10);
        Stage stage = createStage(stageId);

        when(stageDAORepository.findById(stageId)).thenReturn(Optional.of(stage));
        when(controlDAORepository.findControlByStage(stage, pageable)).thenReturn(Page.empty()); // Replace with your mocked Page

        // Assertions
        Page<Control> controlsPage = assertDoesNotThrow(() -> stageService.getControlsByStage(pageable, stageId));
        assertNotNull(controlsPage);
    }

    @Test
    public void testGetControlsByStage_StageNotFound() {
        // Mocking data
        long stageId = 1L;
        Pageable pageable = PageRequest.of(0, 10);

        when(stageDAORepository.findById(stageId)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> stageService.getControlsByStage(pageable, stageId));
        assertEquals("Stage not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    // Helper methods to create mock data
    private StageRequest createStageRequest() {
        StageType stageType = new StageType();
        stageType.setId(1L);
        stageType.setName("Test Stage");
        StageRequest stageRequest = new StageRequest();
        stageRequest.setCultivationId(1L);
        stageRequest.setStageType(stageType);
        stageRequest.setStartStageDate(new Date());
        stageRequest.setFinishStageDate(new Date());
        stageRequest.setControls(new HashSet<>());
        stageRequest.setComment("Test stage");

        return stageRequest;
    }

    private Stage createStage(long id) {
        Cultivation cultivation = new Cultivation();
        cultivation.setId(1L);

        StageType stageType = new StageType();
        stageType.setId(1L);
        stageType.setName("Test Stage");

        Stage stage = new Stage();
        stage.setId(id);
        stage.setStageType(stageType);
        stage.setStartStageDate(new Date());
        stage.setFinishStageDate(new Date());
        stage.setControls(new HashSet<>());
        stage.setComment("Test stage");
        stage.setCultivation(cultivation);

        return stage;
    }
}