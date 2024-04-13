package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StageDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class StageServiceImpl implements StageService {
    private final StageDAORepository stageDAORepository;

    @Autowired
    public StageServiceImpl(StageDAORepository stageDAORepository) {
        this.stageDAORepository = stageDAORepository;
    }
}
