package com.Fijalkowskim.SpaceFarmManagmentSystem.sampledata;

import com.Fijalkowskim.SpaceFarmManagmentSystem.models.*;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

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
    public void run(ApplicationArguments args) {
        insertStationData();
        insertCultivationTypeData();
        insertPlantData();
        insertMeasureUnitData();
        insertStageTypeData();
        insertCultivationData();
        insertPersonData();
        insertStageData();
        insertControlData();
        insertReadingData();
        insertMeasuredValueData();
        insertHarvestData();
    }

    private void insertStationData() {
        stationDAORepository.save(new Station(1L));
        stationDAORepository.save(new Station(2L));
        stationDAORepository.save(new Station(3L));
    }

    private void insertCultivationTypeData() {
        cultivationTypeDAORepository.save(new CultivationType(1L, "Type A"));
        cultivationTypeDAORepository.save(new CultivationType(2L, "Type B"));
    }

    private void insertPlantData() {
        plantDAORepository.save(new Plant(1L, "Plant A"));
        plantDAORepository.save(new Plant(2L, "Plant B"));
        plantDAORepository.save(new Plant(3L, "Plant C"));
    }

    private void insertStageTypeData() {
        stageTypeDAORepository.save(new StageType(1L, "Type X"));
        stageTypeDAORepository.save(new StageType(2L, "Type Y"));
        stageTypeDAORepository.save(new StageType(3L, "Type Z"));
    }

    private void insertMeasureUnitData() {
        measureUnitDAORepository.save(new MeasureUnit(1L, "Kilogram"));
        measureUnitDAORepository.save(new MeasureUnit(2L, "Gram"));
        measureUnitDAORepository.save(new MeasureUnit(3L, "Liter"));
    }

    private void insertCultivationData() {
        cultivationDAORepository.save(new Cultivation(
                1L,
                new java.sql.Date(Timestamp.valueOf("2023-01-01 08:00:00").getTime()), // Convert to java.sql.Date
                cultivationTypeDAORepository.findByIdWithEagerLoading(1L),
                10.5f,
                new java.sql.Date(Timestamp.valueOf("2023-01-20 08:00:00").getTime()), // Convert to java.sql.Date
                new java.sql.Date(Timestamp.valueOf("2023-01-01 08:00:00").getTime()), // Convert to java.sql.Date
                plantDAORepository.findByIdWithEagerLoading(1L)));
        cultivationDAORepository.save(new Cultivation(
                2L,
                new java.sql.Timestamp(Timestamp.valueOf("2023-02-01 08:00:00").getTime()), // Convert to Timestamp
                cultivationTypeDAORepository.findByIdWithEagerLoading(2L),
                8f,
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-20 08:00:00").getTime()), // Convert to Timestamp
                new java.sql.Timestamp(Timestamp.valueOf("2023-02-01 08:00:00").getTime()), // Convert to Timestamp
                plantDAORepository.findByIdWithEagerLoading(2L)
        ));
    }

    private void insertPersonData() {
        personDAORepository.save(new Person(1L, "John", "Doe", "john_doe", "password1", WorkerType.ADMIN));
        personDAORepository.save(new Person(2L, "Alice", "Smith", "alice_smith", "password2", WorkerType.MANAGER));
        personDAORepository.save(new Person(3L, "Bob", "Johnson", "bob_johnson", "password3", WorkerType.LABWORKER));
    }

    private void insertStageData() {
        stageDAORepository.save(new Stage(
                1L,
                stageTypeDAORepository.findByIdWithEagerLoading(1L),
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-10 08:00:00").getTime()), // Convert to Timestamp
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-01 08:00:00").getTime()), // Convert to Timestamp
                cultivationDAORepository.findByIdWithEagerLoading(1L)
        ));
        stageDAORepository.save(new Stage(
                2L,
                stageTypeDAORepository.findByIdWithEagerLoading(2L),
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-20 08:00:00").getTime()), // Convert to Timestamp
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-10 08:00:00").getTime()), // Convert to Timestamp
                cultivationDAORepository.findByIdWithEagerLoading(2L)
        ));
        stageDAORepository.save(new Stage(
                3L,
                stageTypeDAORepository.findByIdWithEagerLoading(3L),
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-10 08:00:00").getTime()), // Convert to Timestamp
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-01 08:00:00").getTime()), // Convert to Timestamp
                cultivationDAORepository.findByIdWithEagerLoading(2L)
        ));
    }

    private void insertControlData() {
        controlDAORepository.save(new Control(1L, stageDAORepository.findByIdWithEagerLoading(1L),
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-15 08:00:00").getTime()), 5));
        controlDAORepository.save(new Control(2L, stageDAORepository.findByIdWithEagerLoading(2L),
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-20 08:00:00").getTime()), 5));
        controlDAORepository.save(new Control(3L, stageDAORepository.findByIdWithEagerLoading(3L),
                new java.sql.Timestamp(Timestamp.valueOf("2023-01-25 08:00:00").getTime()), 5));
    }

    private void insertMeasuredValueData() {
        measuredValueDAORepository.save(new MeasuredValue(1L, "Measurement 1", measureUnitDAORepository.findByIdWithEagerLoading(1L)));
        measuredValueDAORepository.save(new MeasuredValue(2L, "Measurement 2", measureUnitDAORepository.findByIdWithEagerLoading(2L)));
        measuredValueDAORepository.save(new MeasuredValue(3L, "Measurement 3", measureUnitDAORepository.findByIdWithEagerLoading(3L)));
    }

    private void insertReadingData() {
        readingDAORepository.save(new Reading(1L, measuredValueDAORepository.findByIdWithEagerLoading(1L), 10, controlDAORepository.findByIdWithEagerLoading(1L)));
        readingDAORepository.save(new Reading(2L, measuredValueDAORepository.findByIdWithEagerLoading(2L), 15, controlDAORepository.findByIdWithEagerLoading(2L)));
        readingDAORepository.save(new Reading(3L, measuredValueDAORepository.findByIdWithEagerLoading(3L), 20, controlDAORepository.findByIdWithEagerLoading(3L)));
    }


    private void insertHarvestData() {
        harvestDAORepository.save(new Harvest(1L, new java.sql.Timestamp(Timestamp.valueOf("2023-01-25 08:00:00").getTime()), cultivationDAORepository.findByIdWithEagerLoading(1L), Boolean.TRUE));
        harvestDAORepository.save(new Harvest(2L, new java.sql.Timestamp(Timestamp.valueOf("2023-02-10 08:00:00").getTime()), cultivationDAORepository.findByIdWithEagerLoading(2L), Boolean.FALSE));
    }
}
