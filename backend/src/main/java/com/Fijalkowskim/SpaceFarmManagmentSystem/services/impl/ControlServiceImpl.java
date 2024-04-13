package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ControlServiceImpl implements ControlService {
    private final ControlDAORepository controlDAORepository;

    @Autowired
    public ControlServiceImpl(ControlDAORepository controlDAORepository) {
        this.controlDAORepository = controlDAORepository;
    }
}
