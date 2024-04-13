package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.ControlController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/control")
@CrossOrigin("http://localhost:3000")
public class ControlControllerImpl implements ControlController {
    private final ControlService controlService;

    @Autowired
    public ControlControllerImpl(ControlService controlService) {
        this.controlService = controlService;
    }
}
