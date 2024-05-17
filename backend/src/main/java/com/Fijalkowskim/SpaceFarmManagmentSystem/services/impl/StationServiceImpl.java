package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Station;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;

@Transactional
@Service
public class StationServiceImpl implements StationService {
    private final StationDAORepository stationDAORepository;

    @Autowired
    public StationServiceImpl(StationDAORepository stationDAORepository) {
        this.stationDAORepository = stationDAORepository;
    }
    public Page<Station> getStations(Pageable pageable){
        return stationDAORepository.findAll(pageable);
    }
    public Station getStationById(Long stationId) throws CustomHTTPException {
        Optional<Station> station = stationDAORepository.findById(stationId);
        if(station.isEmpty()) throw new CustomHTTPException("Station not found", HttpStatus.NOT_FOUND);
        return station.get();
    }

    public Station addStation() throws CustomHTTPException {
        Station station = Station.builder().build();
        return stationDAORepository.save(station);
    }
    public void deleteStation(Long id) throws CustomHTTPException {
        Optional<Station> station = stationDAORepository.findById(id);
        if(station.isEmpty()) throw new CustomHTTPException("Station not found", HttpStatus.NOT_FOUND);
        stationDAORepository.delete(station.get());
    }
}