package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class StationServiceImpl implements StationService {
    private final StationDAORepository stationDAORepository;

    @Autowired
    public StationServiceImpl(StationDAORepository stationDAORepository) {
        this.stationDAORepository = stationDAORepository;
    }
}
