package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.PersonDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PersonServiceImpl implements PersonService {
    private final PersonDAORepository personDAORepository;

    @Autowired
    public PersonServiceImpl(PersonDAORepository personDAORepository) {
        this.personDAORepository = personDAORepository;
    }
}
