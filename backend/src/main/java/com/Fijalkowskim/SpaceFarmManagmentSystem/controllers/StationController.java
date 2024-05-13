package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( value = "/api/station")
@CrossOrigin("http://localhost:3000")
public class StationController {
    StationServiceImpl stationService;
    @Autowired
    public StationController(StationServiceImpl stationService){
        this.stationService = stationService;
    }
    @GetMapping("/")
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStation(@PathVariable long id) throws CustomHTTPException {
        stationService.deleteStation(id);
        return ResponseEntity.ok("Station deleted successfully.");
    }

    @GetMapping("/")
    public ResponseEntity<?> addStation() {
        stationService.addStation();
        return ResponseEntity.ok("Station added successfully.");
    }
}
