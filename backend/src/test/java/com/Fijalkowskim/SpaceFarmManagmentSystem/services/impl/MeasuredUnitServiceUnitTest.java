package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasureUnitDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.MeasureUnitRequest;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MeasuredUnitServiceUnitTest {
    @Mock
    private MeasureUnitDAORepository measureUnitDAORepository;

    @InjectMocks
    private MeasureUnitServiceImpl measureUnitService;

    @Test
    public void testGetAllMeasureUnits() {
        // Mocking data
        PageRequest pageRequest = PageRequest.of(0, 10);
        MeasureUnit measureUnit = new MeasureUnit();
        Page<MeasureUnit> measureUnitPage = new PageImpl<>(Collections.singletonList(measureUnit));

        // Mocking repository behavior
        when(measureUnitDAORepository.findAll(pageRequest)).thenReturn(measureUnitPage);

        // Assertions
        assertDoesNotThrow(() -> measureUnitService.getAllMeasureUnits(pageRequest));
    }

    @Test
    public void testGetMeasureUnitById_MeasureUnitExists() {
        // Mocking data
        long id = 1L;
        MeasureUnit measureUnit = new MeasureUnit();
        measureUnit.setId(id);

        // Mocking repository behavior
        when(measureUnitDAORepository.findById(id)).thenReturn(Optional.of(measureUnit));

        // Assertions
        assertDoesNotThrow(() -> measureUnitService.getMeasureUnitById(id));
    }
    @Test
    public void testGetMeasureUnitById_MeasureUnitNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(measureUnitDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> measureUnitService.getMeasureUnitById(id));
        assertEquals("Measure unit not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }


    @Test
    public void testAddMeasureUnit() {
        // Mocking data
        MeasureUnitRequest measureUnitRequest = new MeasureUnitRequest();
        measureUnitRequest.setName("Meter");

        MeasureUnit measureUnit = new MeasureUnit();
        measureUnit.setName("Meter");

        // Mocking repository behavior
        when(measureUnitDAORepository.save(any(MeasureUnit.class))).thenReturn(measureUnit);

        // Assertions
        assertDoesNotThrow(() -> measureUnitService.addMeasureUnit(measureUnitRequest));
    }

    @Test
    public void testUpdateMeasureUnit_MeasureUnitExists() {
        // Mocking data
        long id = 1L;
        MeasureUnitRequest measureUnitRequest = new MeasureUnitRequest();
        measureUnitRequest.setName("Meter");

        MeasureUnit oldMeasureUnit = new MeasureUnit();
        oldMeasureUnit.setId(id);

        MeasureUnit newMeasureUnit = new MeasureUnit();
        newMeasureUnit.setId(id);
        newMeasureUnit.setName("Meter");

        // Mocking repository behavior
        when(measureUnitDAORepository.findById(id)).thenReturn(Optional.of(oldMeasureUnit));
        when(measureUnitDAORepository.save(any(MeasureUnit.class))).thenReturn(newMeasureUnit);

        // Assertions
        assertDoesNotThrow(() -> measureUnitService.updateMeasureUnit(id, measureUnitRequest));
    }
    @Test
    public void testUpdateMeasureUnit_MeasureUnitNotFound() {
        // Mocking data
        long id = 1L;
        MeasureUnitRequest measureUnitRequest = new MeasureUnitRequest();
        measureUnitRequest.setName("Kilogram");

        // Mocking repository behavior
        when(measureUnitDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> measureUnitService.updateMeasureUnit(id, measureUnitRequest));
        assertEquals("Measure unit not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }


    @Test
    public void testDeleteMeasureUnit_MeasureUnitExists() {
        // Mocking data
        long id = 1L;
        MeasureUnit measureUnit = new MeasureUnit();

        // Mocking repository behavior
        when(measureUnitDAORepository.findById(id)).thenReturn(Optional.of(measureUnit));

        // Assertions
        assertDoesNotThrow(() -> measureUnitService.deleteMeasureUnit(id));
    }
}
