package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationTypeDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationTypeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;

@Transactional
@Service
public class CultivationTypeServiceImpl {
    private final CultivationTypeDAORepository cultivationTypeDAORepository;

    @Autowired
    public CultivationTypeServiceImpl(CultivationTypeDAORepository cultivationTypeDAORepository) {
        this.cultivationTypeDAORepository = cultivationTypeDAORepository;
    }

    public Page<CultivationType> getAllCultivationTypes(PageRequest pageRequest) {
        return cultivationTypeDAORepository.findAll(pageRequest);
    }

    public CultivationType getCultivationTypeById(long id) throws CustomHTTPException{
        Optional<CultivationType> cultivationType = cultivationTypeDAORepository.findById(id);
        if (cultivationType.isEmpty()){
            throw new CustomHTTPException("Cultivation type not found", HttpStatus.NOT_FOUND);
        }
        return cultivationType.get();
    }

    public CultivationType addCultivationType(CultivationTypeRequest cultivationTypeRequest) throws CustomHTTPException{
        CultivationType cultivationType = CultivationType.builder()
                .name(cultivationTypeRequest.getName())
                .cultivations(new HashSet<>())
                .build();
        return cultivationTypeDAORepository.save(cultivationType);
    }

    public CultivationType updateCultivationType(long id, CultivationTypeRequest cultivationTypeRequest) throws CustomHTTPException {
        Optional<CultivationType> oldCultivationType = cultivationTypeDAORepository.findById(id);
        if (oldCultivationType.isEmpty()){
            throw new CustomHTTPException("Cultivation type not found", HttpStatus.NOT_FOUND);
        }
        CultivationType newCultivationType = CultivationType.builder()
                .name(cultivationTypeRequest.getName())
                .cultivations(new HashSet<>())
                .id(oldCultivationType.get().getId())
                .build();
        return cultivationTypeDAORepository.save(newCultivationType);
    }

    public void deleteCultivationType(long id) throws CustomHTTPException{
        Optional<CultivationType> cultivationType = cultivationTypeDAORepository.findById(id);
        if (cultivationType.isEmpty()){
            throw new CustomHTTPException("Cultivation type not found", HttpStatus.NOT_FOUND);
        }
        cultivationTypeDAORepository.delete(cultivationType.get());
    }
}
