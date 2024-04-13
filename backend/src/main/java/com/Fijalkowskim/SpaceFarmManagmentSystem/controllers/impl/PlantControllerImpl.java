package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.PlantController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/plant")
@CrossOrigin("http://localhost:3000")
public class PlantControllerImpl implements PlantController {
    private final PlantService plantService;

    @Autowired
    public PlantControllerImpl(PlantService plantService) {
        this.plantService = plantService;
    }
}
