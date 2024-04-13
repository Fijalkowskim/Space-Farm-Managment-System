package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.ReadingController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:3000")
public class ReadingControllerImpl implements ReadingController {
    private final ReadingService readingService;

    @Autowired
    public ReadingControllerImpl(ReadingService readingService) {
        this.readingService = readingService;
    }
}
