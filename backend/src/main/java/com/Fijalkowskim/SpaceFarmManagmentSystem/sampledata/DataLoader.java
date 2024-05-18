package com.Fijalkowskim.SpaceFarmManagmentSystem.sampledata;

import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    private final ControlDAORepository controlDAORepository;
    private final CultivationDAORepository cultivationDAORepository;
    private final CultivationTypeDAORepository cultivationTypeDAORepository;
    private final HarvestDAORepository harvestDAORepository;
    private final MeasuredValueDAORepository measuredValueDAORepository;
    private final MeasureUnitDAORepository measureUnitDAORepository;
    private final PersonDAORepository personDAORepository;
    private final PlantDAORepository plantDAORepository;
    private final ReadingDAORepository readingDAORepository;
    private final StageDAORepository stageDAORepository;
    private final StageTypeDAORepository stageTypeDAORepository;
    private final StationDAORepository stationDAORepository;

    public DataLoader(ControlDAORepository controlDAORepository,
                      CultivationDAORepository cultivationDAORepository,
                      CultivationTypeDAORepository cultivationTypeDAORepository,
                      HarvestDAORepository harvestDAORepository,
                      MeasuredValueDAORepository measureDAORepository,
                      MeasureUnitDAORepository measureUnitDAORepository,
                      PersonDAORepository personDAORepository,
                      PlantDAORepository plantDAORepository,
                      ReadingDAORepository readingDAORepository,
                      StageDAORepository stageDAORepository,
                      StageTypeDAORepository stageTypeDAORepository,
                      StationDAORepository stationDAORepository) {
        this.controlDAORepository = controlDAORepository;
        this.cultivationDAORepository = cultivationDAORepository;
        this.cultivationTypeDAORepository = cultivationTypeDAORepository;
        this.harvestDAORepository = harvestDAORepository;
        this.measuredValueDAORepository = measureDAORepository;
        this.measureUnitDAORepository = measureUnitDAORepository;
        this.personDAORepository = personDAORepository;
        this.plantDAORepository = plantDAORepository;
        this.readingDAORepository = readingDAORepository;
        this.stageDAORepository = stageDAORepository;
        this.stageTypeDAORepository = stageTypeDAORepository;
        this.stationDAORepository = stationDAORepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

    }
}
