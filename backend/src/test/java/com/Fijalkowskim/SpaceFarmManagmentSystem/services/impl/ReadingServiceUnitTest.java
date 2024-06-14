package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasuredValueDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ReadingDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.ReadingRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.ReadingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

public class ReadingServiceUnitTest {

    @Mock
    private ReadingDAORepository readingDAORepository;

    @Mock
    private ControlDAORepository controlDAORepository;

    @Mock
    private MeasuredValueDAORepository measuredValueDAORepository;

    @InjectMocks
    private ReadingServiceImpl readingService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetReadings() {
        // Mocking data
        PageRequest pageRequest = PageRequest.of(0, 10);
        Reading reading = new Reading();
        reading.setId(1L);
        Page<Reading> readingPage = new PageImpl<>(new ArrayList<>());
        when(readingDAORepository.findAll(pageRequest)).thenReturn(readingPage);

        // Assertions
        Page<Reading> result = readingService.getReadings(pageRequest);
        assertNotNull(result);
        assertEquals(readingPage, result);
    }

    @Test
    public void testGetReadingById_ReadingExists() {
        // Mocking data
        long id = 1L;
        Reading reading = new Reading();
        reading.setId(id);
        when(readingDAORepository.findById(id)).thenReturn(Optional.of(reading));

        // Assertions
        Reading result = readingService.getReadingById(id);
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testGetReadingById_ReadingNotFound() {
        // Mocking data
        long id = 1L;
        when(readingDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> readingService.getReadingById(id));
        assertEquals("Reading not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddReading() {
        // Mocking data
        ReadingRequest readingRequest = new ReadingRequest();
        readingRequest.setControlId(1L);
        readingRequest.setMeasuredValueId(1L);
        readingRequest.setValue(23);

        Control control = mock(Control.class);
        MeasuredValue measuredValue = mock(MeasuredValue.class);
        Reading reading = mock(Reading.class);

        // Initialize readings set
        when(control.getReadings()).thenReturn(new HashSet<>());
        when(measuredValue.getReadings()).thenReturn(new HashSet<>());

        // Setting up mocked entities
        when(control.getId()).thenReturn(1L);
        when(measuredValue.getId()).thenReturn(1L);

        // Mocking repository behavior
        when(controlDAORepository.findById(1L)).thenReturn(Optional.of(control));
        when(measuredValueDAORepository.findById(1L)).thenReturn(Optional.of(measuredValue));
        when(readingDAORepository.save(any(Reading.class))).thenReturn(reading);

        // Assertions
        assertDoesNotThrow(() -> readingService.addReading(readingRequest));
    }


    @Test
    public void testUpdateReading_ReadingExists() {
        // Mocking data
        long id = 1L;
        ReadingRequest readingRequest = new ReadingRequest();
        readingRequest.setControlId(1L);
        readingRequest.setMeasuredValueId(1L);
        readingRequest.setValue(23);

        Control control = new Control();
        control.setId(1L);

        MeasuredValue measuredValue = new MeasuredValue();
        measuredValue.setId(1L);

        Reading oldReading = new Reading();
        oldReading.setId(id);

        Reading newReading = new Reading();
        newReading.setId(id);
        newReading.setControl(control);
        newReading.setMeasuredValue(measuredValue);
        newReading.setValue(23);

        // Mocking repository behavior
        when(controlDAORepository.findById(1L)).thenReturn(Optional.of(control));
        when(measuredValueDAORepository.findById(1L)).thenReturn(Optional.of(measuredValue));
        when(readingDAORepository.findById(id)).thenReturn(Optional.of(oldReading));
        when(readingDAORepository.save(any(Reading.class))).thenReturn(newReading);

        // Assertions
        assertDoesNotThrow(() -> readingService.updateReading(id, readingRequest));
    }

    @Test
    public void testUpdateReading_ReadingNotFound() {
        // Mocking data
        long id = 1L;
        ReadingRequest readingRequest = new ReadingRequest();
        readingRequest.setControlId(1L);
        readingRequest.setMeasuredValueId(1L);
        readingRequest.setValue(23);

        Control control = new Control();
        control.setId(1L);

        MeasuredValue measuredValue = new MeasuredValue();
        measuredValue.setId(1L);

        // Mocking repository behavior
        when(controlDAORepository.findById(1L)).thenReturn(Optional.of(control));
        when(measuredValueDAORepository.findById(1L)).thenReturn(Optional.of(measuredValue));
        when(readingDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> readingService.updateReading(id, readingRequest));
        assertEquals("Reading not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testDeleteReading_ReadingExists() {
        // Mocking data
        long id = 1L;
        Reading reading = new Reading();
        reading.setId(id);

        // Mocking repository behavior
        when(readingDAORepository.findById(id)).thenReturn(Optional.of(reading));
        doNothing().when(readingDAORepository).delete(reading);

        // Assertions
        assertDoesNotThrow(() -> readingService.deleteReading(id));
    }

    @Test
    public void testDeleteReading_ReadingNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(readingDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> readingService.deleteReading(id));
        assertEquals("Reading not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
