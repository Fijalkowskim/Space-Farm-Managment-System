package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.StationController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/station")
@CrossOrigin("http://localhost:3000")
public class StationControllerImpl implements StationController {
    private final StationService stationService;

    @Autowired
    public StationControllerImpl(StationService stationService) {
        this.stationService = stationService;
    }
}
