package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.CultivationController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.CultivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/cultivation")
@CrossOrigin("http://localhost:3000")
public class CultivationControllerImpl implements CultivationController {
    private final CultivationService cultivationService;

    @Autowired
    public CultivationControllerImpl(CultivationService cultivationService) {
        this.cultivationService = cultivationService;
    }
}
