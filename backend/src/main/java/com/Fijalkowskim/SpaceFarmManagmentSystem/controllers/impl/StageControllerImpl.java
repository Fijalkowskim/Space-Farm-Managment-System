package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.StageController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/stage")
@CrossOrigin("http://localhost:3000")
public class StageControllerImpl implements StageController {
    private final StageService stageService;

    @Autowired
    public StageControllerImpl(StageService stageService) {
        this.stageService = stageService;
    }
}
