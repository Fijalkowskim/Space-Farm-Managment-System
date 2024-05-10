package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.CultivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;

@Transactional
@Service
public class CultivationServiceImpl implements CultivationService {
    private final CultivationDAORepository cultivationDAORepository;

    @Autowired
    public CultivationServiceImpl(CultivationDAORepository cultivationDAORepository) {
        this.cultivationDAORepository = cultivationDAORepository;
    }

    public Page<Cultivation> getCultivations(PageRequest pageRequest){
        return cultivationDAORepository.findAll(pageRequest);
    }
    public Cultivation getCultivationById(long id) throws CustomHTTPException {
        Optional<Cultivation> cultivation = cultivationDAORepository.findById(id);
        if(cultivation.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        return cultivation.get();
    }
    public Cultivation addCultivation(CultivationRequest cultivationRequest) throws CustomHTTPException {
        Cultivation cultivation = Cultivation.builder()
                .startDate(cultivationRequest.getStartDate())
                .type(cultivationRequest.getType())
                .area(cultivationRequest.getArea())
                .plannedFinishDate(cultivationRequest.getPlannedFinishDate())
                .plannedFinishDate(new Date())
                .plant(cultivationRequest.getPlant())
                .stages(new HashSet<>())
                .harvests(new HashSet<>())
                .stations(new HashSet<>())
                .responsibleWorkers(cultivationRequest.getResponsibleWorkers())
                .comment(cultivationRequest.getComment())
                .build();
        return cultivationDAORepository.save(cultivation);
    }
    public void deleteCultivation(long id) throws CustomHTTPException{
        Optional<Cultivation> cultivation = cultivationDAORepository.findById(id);
        if(cultivation.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        cultivationDAORepository.deleteById(id);
    }
    public Cultivation updateCultivation(long id, CultivationRequest cultivationRequest){
        Optional<Cultivation> oldCultivation = cultivationDAORepository.findById(id);
        if(oldCultivation.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        Cultivation cultivation = Cultivation.builder()
                .startDate(cultivationRequest.getStartDate())
                .type(cultivationRequest.getType())
                .area(cultivationRequest.getArea())
                .plannedFinishDate(cultivationRequest.getPlannedFinishDate())
                .realFinishDate(new Date())
                .plant(cultivationRequest.getPlant())
                .stages(new HashSet<>())
                .harvests(new HashSet<>())
                .stations(new HashSet<>())
                .responsibleWorkers(cultivationRequest.getResponsibleWorkers())
                .comment(cultivationRequest.getComment())
                .id(oldCultivation.get().getId())
                .build();
        return cultivationDAORepository.save(cultivation);
    }

}
