package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.HarvestController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.HarvestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/harvest")
@CrossOrigin("http://localhost:3000")
public class HarvestControllerImpl implements HarvestController {
    private final HarvestService harvestService;

    @Autowired
    public HarvestControllerImpl(HarvestService harvestService) {
        this.harvestService = harvestService;
    }
}
