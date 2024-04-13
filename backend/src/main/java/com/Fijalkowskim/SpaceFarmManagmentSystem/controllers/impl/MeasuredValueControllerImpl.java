package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.MeasuredValueController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.MeasuredValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/measuredValue")
@CrossOrigin("http://localhost:3000")
public class MeasuredValueControllerImpl implements MeasuredValueController {
    private final MeasuredValueService measuredValueService;

    @Autowired
    public MeasuredValueControllerImpl(MeasuredValueService measuredValueService) {
        this.measuredValueService = measuredValueService;
    }
}
