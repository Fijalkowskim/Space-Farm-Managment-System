package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Harvest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.HarvestDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.HarvestRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.HarvestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Transactional
@Service
public class HarvestServiceImpl implements HarvestService {
    private final HarvestDAORepository harvestDAORepository;
    private final CultivationDAORepository cultivationDAORepository;

    @Autowired
    public HarvestServiceImpl(HarvestDAORepository harvestDAORepository, CultivationDAORepository cultivationDAORepository) {
        this.harvestDAORepository = harvestDAORepository;
        this.cultivationDAORepository = cultivationDAORepository;
    }

    public Page<Harvest> getHarvests(PageRequest pageRequest) {
        return harvestDAORepository.findAll(pageRequest);
    }

    public Harvest getHarvestById(long id) {
        Optional<Harvest> harvest = harvestDAORepository.findById(id);
        if(harvest.isEmpty()) throw new CustomHTTPException("Harvest not found", HttpStatus.NOT_FOUND);
        return harvest.get();
    }

    public Harvest addHarvest(HarvestRequest harvestRequest) {
        Optional<Cultivation> cultivation = cultivationDAORepository.findById(harvestRequest.getCultivationId());
        if(cultivation.isEmpty()) throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        Harvest harvest = Harvest.builder()
                .harvestDate(harvestRequest.getHarvestDate())
                .comment(harvestRequest.getComment())
                .successfulHarvest(harvestRequest.isSuccessfulHarvest())
                .cultivation(cultivation.get())
                .build();
        cultivation.get().getHarvests().add(harvest);
        cultivationDAORepository.save(cultivation.get());
        return harvestDAORepository.save(harvest);
    }

    public Harvest updateHarvest(long id, HarvestRequest harvestRequest) {
        Optional<Harvest> oldHarvest = harvestDAORepository.findById(id);
        if(oldHarvest.isEmpty()) throw new CustomHTTPException("Harvest not found", HttpStatus.NOT_FOUND);
        Optional<Cultivation> cultivation = cultivationDAORepository.findById(harvestRequest.getCultivationId());
        if(cultivation.isEmpty()) throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        Harvest harvest = Harvest.builder()
                .id(oldHarvest.get().getId())
                .harvestDate(harvestRequest.getHarvestDate())
                .comment(harvestRequest.getComment())
                .successfulHarvest(harvestRequest.isSuccessfulHarvest())
                .cultivation(cultivation.get())
                .build();
        return harvestDAORepository.save(harvest);
    }

    public void deleteHarvest(long id) {
        Optional<Harvest> harvest = harvestDAORepository.findById(id);
        Optional<Cultivation> cultivation = cultivationDAORepository.findCultivationHarvestById(id);
        if(cultivation.isPresent()){
            throw new CustomHTTPException("Harvest assigned to cultivation", HttpStatus.FOUND);
        }
        if(harvest.isEmpty()) throw new CustomHTTPException("Harvest not found", HttpStatus.NOT_FOUND);
        harvestDAORepository.delete(harvest.get());
    }

    public Set<Harvest> getHarvestsByCultivationId(long cultivationId) {
        return harvestDAORepository.findAllByCultivationId(cultivationId);
    }
}
