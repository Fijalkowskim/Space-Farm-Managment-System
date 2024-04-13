package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.controllers.PersonController;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/person")
@CrossOrigin("http://localhost:3000")
public class PersonControllerImpl implements PersonController {
    private final PersonService personService;

    @Autowired
    public PersonControllerImpl(PersonService personService) {
        this.personService = personService;
    }
}
