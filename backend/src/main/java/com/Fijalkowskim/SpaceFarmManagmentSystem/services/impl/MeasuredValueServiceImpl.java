package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasuredValueDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.MeasuredValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class MeasuredValueServiceImpl implements MeasuredValueService {
    private final MeasuredValueDAORepository measuredValueDAORepository;

    @Autowired
    public MeasuredValueServiceImpl(MeasuredValueDAORepository measuredValueDAORepository) {
        this.measuredValueDAORepository = measuredValueDAORepository;
    }
}
