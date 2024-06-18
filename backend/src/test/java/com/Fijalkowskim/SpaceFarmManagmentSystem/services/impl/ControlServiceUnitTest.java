package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.ControlRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ControlServiceUnitTest {

    @Mock
    private ControlDAORepository controlDAORepository;

    @Mock
    private StageDAORepository stageDAORepository;

    @InjectMocks
    private ControlServiceImpl controlService;

    @Test
    public void testGetControls() {
        Control control1 = new Control();
        Control control2 = new Control();
        Page<Control> mockedPage = new PageImpl<>(List.of(control1, control2));

        when(controlDAORepository.findAll(Pageable.unpaged())).thenReturn(mockedPage);

        Page<Control> resultPage = controlService.getControls(Pageable.unpaged());

        assertEquals(mockedPage, resultPage);
    }
    @Test
    public void testGetControlById_ControlFound() {
        // Mocking data
        long controlId = 1L;
        Control mockedControl = new Control(/* pass constructor arguments here */);

        // Mocking repository behavior
        when(controlDAORepository.findById(controlId)).thenReturn(Optional.of(mockedControl));

        // Calling the method under test
        Control resultControl = controlService.getControlById(controlId);

        // Assertions
        assertEquals(mockedControl, resultControl);
    }

    @Test
    public void testGetControlById_ControlNotFound() {
        // Mocking data
        long controlId = 1L;

        // Mocking repository behavior
        when(controlDAORepository.findById(controlId)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class,
                () -> controlService.getControlById(controlId));
        assertEquals("Control not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testDeleteControl_ControlFound() {
        // Mocking data
        long controlId = 1L;
        Control mockedControl = new Control(/* pass constructor arguments here */);

        // Mocking repository behavior
        when(controlDAORepository.findById(controlId)).thenReturn(Optional.of(mockedControl));
        doNothing().when(controlDAORepository).deleteById(controlId);

        // Calling the method under test
        controlService.deleteControl(controlId);

        // Assertions
        // No need to assert anything, as we're just verifying that the method is called without exceptions
    }

    @Test
    public void testDeleteControl_ControlNotFound() {
        // Mocking data
        long controlId = 1L;

        // Mocking repository behavior
        when(controlDAORepository.findById(controlId)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class,
                () -> controlService.deleteControl(controlId));
        assertEquals("Control not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddControl_StageNotFound() {
        // Mocking data
        ControlRequest controlRequest = new ControlRequest();
        controlRequest.setStageId(1L);

        // Mocking repository behavior
        when(stageDAORepository.findById(controlRequest.getStageId())).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class,
                () -> controlService.addControl(controlRequest));
        assertEquals("Stage not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
    @Test
    public void testAddControl_ControlDateInFuture() {
        // Mocking data
        ControlRequest controlRequest = new ControlRequest();
        controlRequest.setStageId(1L);
        controlRequest.setControlDate(new Date(System.currentTimeMillis() + 86400000)); // Tomorrow

        // Mocking repository behavior
        when(stageDAORepository.findById(controlRequest.getStageId())).thenReturn(Optional.of(new Stage(/* pass constructor arguments here */)));

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class,
                () -> controlService.addControl(controlRequest));
        assertEquals("Control date cannot be in the future", exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void testUpdateControl_ControlNotFound() {
        // Mocking data
        long controlId = 1L;
        ControlRequest controlRequest = new ControlRequest(/* pass constructor arguments here */);

        // Mocking repository behavior
        when(controlDAORepository.findById(controlId)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class,
                () -> controlService.updateControl(controlId, controlRequest));
        assertEquals("Control not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

}
