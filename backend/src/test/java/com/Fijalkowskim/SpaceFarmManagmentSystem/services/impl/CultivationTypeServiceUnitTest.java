package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationTypeDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationTypeRequest;
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
public class CultivationTypeServiceUnitTest {
    @Mock
    private CultivationTypeDAORepository cultivationTypeDAORepository;

    @InjectMocks
    private CultivationTypeServiceImpl cultivationTypeService;

    @Test
    public void testGetAllCultivationTypes() {
        // Mocking data
        PageRequest pageRequest = PageRequest.of(0, 10);
        CultivationType cultivationType = new CultivationType();
        Page<CultivationType> cultivationTypePage = new PageImpl<>(Collections.singletonList(cultivationType));

        // Mocking repository behavior
        when(cultivationTypeDAORepository.findAll(pageRequest)).thenReturn(cultivationTypePage);

        // Assertions
        Page<CultivationType> result = cultivationTypeService.getAllCultivationTypes(pageRequest);
        assertEquals(1, result.getTotalElements());
    }

    @Test
    public void testGetCultivationTypeById_CultivationTypeExists() {
        // Mocking data
        long id = 1L;
        CultivationType cultivationType = new CultivationType();
        cultivationType.setId(id);

        // Mocking repository behavior
        when(cultivationTypeDAORepository.findById(id)).thenReturn(Optional.of(cultivationType));

        // Assertions
        CultivationType result = cultivationTypeService.getCultivationTypeById(id);
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    public void testGetCultivationTypeById_CultivationTypeNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(cultivationTypeDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> cultivationTypeService.getCultivationTypeById(id));
        assertEquals("Cultivation type not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testAddCultivationType() {
        // Mocking data
        CultivationTypeRequest cultivationTypeRequest = new CultivationTypeRequest();
        cultivationTypeRequest.setName("Test Cultivation Type");

        CultivationType cultivationType = new CultivationType();
        cultivationType.setName("Test Cultivation Type");

        // Mocking repository behavior
        when(cultivationTypeDAORepository.save(any(CultivationType.class))).thenReturn(cultivationType);

        // Assertions
        assertDoesNotThrow(() -> cultivationTypeService.addCultivationType(cultivationTypeRequest));
    }

    @Test
    public void testUpdateCultivationType_CultivationTypeExists() {
        // Mocking data
        long id = 1L;
        CultivationTypeRequest cultivationTypeRequest = new CultivationTypeRequest();
        cultivationTypeRequest.setName("Updated Cultivation Type");

        CultivationType oldCultivationType = new CultivationType();
        oldCultivationType.setId(id);
        oldCultivationType.setName("Old Cultivation Type");

        CultivationType newCultivationType = new CultivationType();
        newCultivationType.setId(id);
        newCultivationType.setName("Updated Cultivation Type");

        // Mocking repository behavior
        when(cultivationTypeDAORepository.findById(id)).thenReturn(Optional.of(oldCultivationType));
        when(cultivationTypeDAORepository.save(any(CultivationType.class))).thenReturn(newCultivationType);

        // Assertions
        assertDoesNotThrow(() -> cultivationTypeService.updateCultivationType(id, cultivationTypeRequest));
    }

    @Test
    public void testUpdateCultivationType_CultivationTypeNotFound() {
        // Mocking data
        long id = 1L;
        CultivationTypeRequest cultivationTypeRequest = new CultivationTypeRequest();
        cultivationTypeRequest.setName("Updated Cultivation Type");

        // Mocking repository behavior
        when(cultivationTypeDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () ->
                cultivationTypeService.updateCultivationType(id, cultivationTypeRequest));
        assertEquals("Cultivation type not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void testDeleteCultivationType_CultivationTypeExists() {
        // Mocking data
        long id = 1L;
        CultivationType cultivationType = new CultivationType();

        // Mocking repository behavior
        when(cultivationTypeDAORepository.findById(id)).thenReturn(Optional.of(cultivationType));

        // Assertions
        assertDoesNotThrow(() -> cultivationTypeService.deleteCultivationType(id));
    }

    @Test
    public void testDeleteCultivationType_CultivationTypeNotFound() {
        // Mocking data
        long id = 1L;

        // Mocking repository behavior
        when(cultivationTypeDAORepository.findById(id)).thenReturn(Optional.empty());

        // Assertions
        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () ->
                cultivationTypeService.deleteCultivationType(id));
        assertEquals("Cultivation type not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
