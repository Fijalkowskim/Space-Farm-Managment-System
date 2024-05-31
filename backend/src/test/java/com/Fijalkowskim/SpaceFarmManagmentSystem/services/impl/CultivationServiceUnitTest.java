package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CultivationServiceUnitTest {
    @InjectMocks
    CultivationServiceImpl cultivationService;
    @Mock
    CultivationDAORepository cultivationDAORepository;
    @Test
    public void GetCultivationById_ProperId_ReturnCultivation() {
        final long id = 1;
        Cultivation expectedCultivation = Cultivation.builder().id(id).build();
        when(cultivationDAORepository.findById(id)).thenReturn(Optional.of(expectedCultivation));

        Cultivation returnedCultivation = cultivationService.getCultivationById(id);

        assertEquals(expectedCultivation, returnedCultivation, "Returned cultivation is not the same as expected");
    }
    @Test
    public void GetCultivationById_NotExistingId_ThrowError() {
        final long id = 2;
        when(cultivationDAORepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CustomHTTPException.class, ()->{ cultivationService.getCultivationById(id);});
    }
    @Test
    public void GetCultivationById_IdEqualsZero_ThrowError() {
        final long id = 0;
        Cultivation expectedCultivation = Cultivation.builder().id(id).build();
        when(cultivationDAORepository.findById(id)).thenReturn(Optional.of(expectedCultivation));

        Cultivation returnedCultivation = cultivationService.getCultivationById(id);

        assertEquals(expectedCultivation, returnedCultivation, "Returned cultivation is not the same as expected");
    }
    @Test
    public void GetCultivationById_NegativeId_ThrowError() {
        final long id = -1;
        when(cultivationDAORepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CustomHTTPException.class, ()->{ cultivationService.getCultivationById(id);});
    }
}
