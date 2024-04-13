package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ReadingDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ReadingServiceImpl implements ReadingService {
    private final ReadingDAORepository readingDAORepository;

    @Autowired
    public ReadingServiceImpl(ReadingDAORepository readingDAORepository) {
        this.readingDAORepository = readingDAORepository;
    }
}
