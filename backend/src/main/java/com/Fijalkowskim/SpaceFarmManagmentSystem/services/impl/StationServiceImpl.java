package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Station;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.HashSet;
import java.util.Set;

@Transactional
@Service
public class StationServiceImpl implements StationService {
    private final StationDAORepository stationDAORepository;
    private final CultivationDAORepository cultivationDAORepository;

    @Autowired
    public StationServiceImpl(StationDAORepository stationDAORepository, CultivationDAORepository cultivationDAORepository) {
        this.stationDAORepository = stationDAORepository;
        this.cultivationDAORepository = cultivationDAORepository;
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
        Station station = Station.builder()
                .cultivations(new HashSet<>())
                .build();
        return stationDAORepository.save(station);
    }
    public void deleteStation(Long id) throws CustomHTTPException {
        Optional<Station> station = stationDAORepository.findById(id);
        Optional<Cultivation> cultivation = cultivationDAORepository.findCultivationStationById(id);
        if(cultivation.isPresent()){
            throw new CustomHTTPException("Station assigned to cultivation", HttpStatus.FOUND);
        }
        if(station.isEmpty()) throw new CustomHTTPException("Station not found", HttpStatus.NOT_FOUND);
        stationDAORepository.delete(station.get());
    }

    public Station updateStation(long id) throws CustomHTTPException {
        Optional<Station> station = stationDAORepository.findById(id);
        if(station.isEmpty()) throw new CustomHTTPException("Station not found", HttpStatus.NOT_FOUND);
        return stationDAORepository.save(station.get());
    }
    public Set<Station> getStationsByCultivationId(Long cultivationId){
        return stationDAORepository.findAllByCultivationId((cultivationId));
    }
}