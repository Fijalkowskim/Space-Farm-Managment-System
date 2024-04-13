package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.HarvestDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.HarvestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class HarvestServiceImpl implements HarvestService {
    private final HarvestDAORepository harvestDAORepository;

    @Autowired
    public HarvestServiceImpl(HarvestDAORepository harvestDAORepository) {
        this.harvestDAORepository = harvestDAORepository;
    }
}
