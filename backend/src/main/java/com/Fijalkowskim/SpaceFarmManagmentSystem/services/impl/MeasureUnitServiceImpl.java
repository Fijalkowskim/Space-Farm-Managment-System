package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasureUnitDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasuredValueDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.MeasureUnitRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.MeasureUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;

@Transactional
@Service
public class MeasureUnitServiceImpl implements MeasureUnitService {
    private final MeasureUnitDAORepository measureUnitDAORepository;
    private final MeasuredValueDAORepository measuredValueDAORepository;

    @Autowired
    public MeasureUnitServiceImpl(MeasureUnitDAORepository measureUnitDAORepository, MeasuredValueDAORepository measuredValueDAORepository) {
        this.measureUnitDAORepository = measureUnitDAORepository;
        this.measuredValueDAORepository = measuredValueDAORepository;
    }

    public Page<MeasureUnit> getAllMeasureUnits(PageRequest pageRequest) {
        return measureUnitDAORepository.findAll(pageRequest);
    }

    public MeasureUnit getMeasureUnitById(long id) throws CustomHTTPException {
        Optional<MeasureUnit> measureUnit = measureUnitDAORepository.findById(id);
        if (measureUnit.isEmpty()){
            throw new CustomHTTPException("Measure unit not found", HttpStatus.NOT_FOUND);
        }
        return measureUnit.get();
    }

    public MeasureUnit addMeasureUnit(MeasureUnitRequest measureUnitRequest) throws CustomHTTPException{
        MeasureUnit measureUnit = MeasureUnit.builder()
                .name(measureUnitRequest.getName())
                .measuredValues(new HashSet<>())
                .build();
        return measureUnitDAORepository.save(measureUnit);
    }

    public MeasureUnit updateMeasureUnit(long id, MeasureUnitRequest measureUnitRequest) throws CustomHTTPException {
        Optional<MeasureUnit> oldMeasureUnit = measureUnitDAORepository.findById(id);
        if (oldMeasureUnit.isEmpty()){
            throw new CustomHTTPException("Measure unit not found", HttpStatus.NOT_FOUND);
        }
        MeasureUnit newMeasureUnit = MeasureUnit.builder()
                .name(measureUnitRequest.getName())
                .measuredValues(new HashSet<>())
                .id(oldMeasureUnit.get().getId())
                .build();
        return measureUnitDAORepository.save(newMeasureUnit);
    }
    public void deleteMeasureUnit(long id) throws CustomHTTPException {
        Optional<MeasureUnit> measureUnit = measureUnitDAORepository.findById(id);
        Optional<MeasuredValue> measuredValue = measuredValueDAORepository.findByUnitId(id);
        if(measuredValue.isPresent()){
            throw new CustomHTTPException("Measure unit assigned to measured value", HttpStatus.FOUND);
        }
        if (measureUnit.isEmpty()){
            throw new CustomHTTPException("Measure unit not found", HttpStatus.NOT_FOUND);
        }
        measureUnitDAORepository.deleteById(id);
    }
}
