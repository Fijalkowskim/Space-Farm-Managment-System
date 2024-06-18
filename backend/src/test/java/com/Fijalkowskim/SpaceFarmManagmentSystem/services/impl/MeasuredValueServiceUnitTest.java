package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasuredValueDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.MeasuredValueRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MeasuredValueServiceUnitTest {
    @Mock
    private MeasuredValueDAORepository measuredValueDAORepository;

    @InjectMocks
    private MeasuredValueServiceImpl measuredValueService;

    @Test
    public void testGetMeasuredValues() {
        // Mocking data
        Pageable pageable = Pageable.unpaged();
        MeasuredValue measuredValue = new MeasuredValue();
        Page<MeasuredValue> measuredValuePage = new PageImpl<>(Collections.singletonList(measuredValue));

        // Mocking repository behavior
        when(measuredValueDAORepository.findAll(pageable)).thenReturn(measuredValuePage);

        // Assertions
        Page<MeasuredValue> result = measuredValueService.getMeasuredValues(pageable);
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
    }

    @Test
    public void testGetMeasuredValueById_MeasuredValueExists() {
        // Mocking data
        long id = 1L;
        MeasuredValue measuredValue = new MeasuredValue();
        measuredValue.setId(id);

        // Mocking repository behavior
        when(measuredValueDAORepository.findById(id)).thenReturn(Optional.of(measuredValue));

        // Assertions
        assertDoesNotThrow(() -> measuredValueService.getMeasuredValueById(id));
    }

    @Test
    public void testGetMeasuredValueById_MeasuredValueNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(measuredValueDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> measuredValueService.getMeasuredValueById(id));
        assertEquals("MeasuredValue not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddMeasuredValue() {
        // Mocking data
        MeasuredValueRequest measuredValueRequest = new MeasuredValueRequest();
        measuredValueRequest.setName("Temperature");
        measuredValueRequest.setMeasureUnitId(1L);

        MeasuredValue measuredValue = new MeasuredValue();
        measuredValue.setName("Temperature");
        measuredValue.setMeasureUnit(new MeasureUnit(1L, "Celsius"));

        // Mocking repository behavior
        when(measuredValueDAORepository.save(any(MeasuredValue.class))).thenReturn(measuredValue);

        // Assertions
        assertDoesNotThrow(() -> measuredValueService.addMeasuredValue(measuredValueRequest));
    }

    @Test
    public void testUpdateMeasuredValue_MeasuredValueExists() {
        // Mocking data
        long id = 1L;
        MeasuredValueRequest measuredValueRequest = new MeasuredValueRequest();
        measuredValueRequest.setName("Temperature");
        measuredValueRequest.setMeasureUnitId(1L);

        MeasuredValue oldMeasuredValue = new MeasuredValue();
        oldMeasuredValue.setId(id);

        MeasuredValue newMeasuredValue = new MeasuredValue();
        newMeasuredValue.setId(id);
        newMeasuredValue.setName("Temperature");
        newMeasuredValue.setMeasureUnit(new MeasureUnit(1L, "Celsius"));

        // Mocking repository behavior
        when(measuredValueDAORepository.findById(id)).thenReturn(Optional.of(oldMeasuredValue));
        when(measuredValueDAORepository.save(any(MeasuredValue.class))).thenReturn(newMeasuredValue);

        // Assertions
        assertDoesNotThrow(() -> measuredValueService.updateMeasuredValue(id, measuredValueRequest));
    }


    @Test
    public void testUpdateMeasuredValue_MeasuredValueNotFound() {
        // Mocking data
        long id = 1L;
        MeasuredValueRequest measuredValueRequest = new MeasuredValueRequest();

        // Mocking repository behavior
        when(measuredValueDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () ->
                measuredValueService.updateMeasuredValue(id, measuredValueRequest));
        assertEquals("MeasuredValue not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testDeleteMeasuredValue_MeasuredValueExists() {
        // Mocking data
        long id = 1L;
        MeasuredValue measuredValue = new MeasuredValue();

        // Mocking repository behavior
        when(measuredValueDAORepository.findById(id)).thenReturn(Optional.of(measuredValue));

        // Assertions
        assertDoesNotThrow(() -> measuredValueService.deleteMeasuredValue(id));
    }

    @Test
    public void testDeleteMeasuredValue_MeasuredValueNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(measuredValueDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () ->
                measuredValueService.deleteMeasuredValue(id));
        assertEquals("MeasuredValue not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
