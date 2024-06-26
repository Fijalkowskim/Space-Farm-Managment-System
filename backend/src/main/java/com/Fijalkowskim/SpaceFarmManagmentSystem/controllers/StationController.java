package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Station;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.StationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.PersonServiceImpl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;

import java.util.Set;

@RestController
@RequestMapping( value = "/api/station")
@CrossOrigin("http://localhost:3000")
public class StationController {
    StationServiceImpl stationService;
    PersonServiceImpl personService;
    @Autowired
    public StationController(StationServiceImpl stationService, PersonServiceImpl personService){
        this.stationService = stationService;
        this.personService = personService;
    }
    @GetMapping("")
    public Page<Station> getStations(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return stationService.getStations(pageRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Station> getStation(
            @PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(stationService.getStationById(id));
    }
    @GetMapping("/cultivation/{cultivationId}")
    public  ResponseEntity<Set<Station>> getStationsByCultivationId(
            @PathVariable long cultivationId) {
        return ResponseEntity.ok(stationService.getStationsByCultivationId(cultivationId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStation(@PathVariable long id, @RequestParam long userID) throws CustomHTTPException {
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN || personService.getPersonById(userID).getRole() == WorkerType.MANAGER) {
            stationService.deleteStation(id);
            return ResponseEntity.ok("Station deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
        }
    }

    @PutMapping("")
    public ResponseEntity<Station> addStation() {
        return ResponseEntity.status(HttpStatus.CREATED).body(stationService.addStation());
    }

    @PostMapping("/{id}")
    public ResponseEntity<Station> updateStation(@PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.status(HttpStatus.OK).body(stationService.updateStation(id));
    }
}
