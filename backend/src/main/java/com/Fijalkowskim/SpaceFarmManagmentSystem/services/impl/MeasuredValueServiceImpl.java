package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasureUnitDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasuredValueDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ReadingDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.MeasuredValueRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.MeasuredValueService;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;


@Transactional
@Service
public class MeasuredValueServiceImpl implements MeasuredValueService {
    private final MeasureUnitDAORepository measureUnitDAORepository;;
    private final MeasuredValueDAORepository measuredValueDAORepository;
    private final ReadingDAORepository readingDAORepository;

    @Autowired
    public MeasuredValueServiceImpl(MeasuredValueDAORepository measuredValueDAORepository, ReadingDAORepository readingDAORepository, MeasureUnitDAORepository measureUnitDAORepository) {
        this.measuredValueDAORepository = measuredValueDAORepository;
        this.readingDAORepository = readingDAORepository;
        this.measureUnitDAORepository = measureUnitDAORepository;
    }

    public Page<MeasuredValue> getMeasuredValues(Pageable pageable){
        return measuredValueDAORepository.findAll(pageable);
    }
    public MeasuredValue getMeasuredValueById(Long measuredValueId) throws CustomHTTPException {
        Optional<MeasuredValue> MeasuredValue = measuredValueDAORepository.findById(measuredValueId);
        if(MeasuredValue.isEmpty()) throw new CustomHTTPException("MeasuredValue not found", HttpStatus.NOT_FOUND);
        return MeasuredValue.get();
    }
    public MeasuredValue addMeasuredValue(MeasuredValueRequest measuredValueRequest) throws CustomHTTPException {
        Optional<MeasureUnit> optionalMeasureUnit = measureUnitDAORepository.findById(measuredValueRequest.getMeasureUnitId());
        if(optionalMeasureUnit.isEmpty()) throw new CustomHTTPException("Measure not found", HttpStatus.NOT_FOUND);
        MeasuredValue measuredValue = MeasuredValue.builder()
                .name(measuredValueRequest.getName())
                .measureUnit(optionalMeasureUnit.get())
                .build();
        return measuredValueDAORepository.save(measuredValue);
    }
    public MeasuredValue updateMeasuredValue(long id, MeasuredValueRequest measuredValueRequest) throws CustomHTTPException {
        Optional<MeasuredValue> oldMeasuredValue = measuredValueDAORepository.findById(id);
        Optional<MeasureUnit> optionalMeasureUnit = measureUnitDAORepository.findById(measuredValueRequest.getMeasureUnitId());
        if(optionalMeasureUnit.isEmpty()) throw new CustomHTTPException("Measure not found", HttpStatus.NOT_FOUND);
        if(oldMeasuredValue.isEmpty()) throw new CustomHTTPException("MeasuredValue not found", HttpStatus.NOT_FOUND);
        MeasuredValue newMeasuredValue = MeasuredValue.builder()
                .name(measuredValueRequest.getName())
                .measureUnit(optionalMeasureUnit.get())
                .id(oldMeasuredValue.get().getId())
                .build();
        return measuredValueDAORepository.save(newMeasuredValue);
    }
    public void deleteMeasuredValue(Long id) throws CustomHTTPException {
        Optional<MeasuredValue> measuredValue = measuredValueDAORepository.findById(id);
        if(measuredValue.isEmpty()) throw new CustomHTTPException("MeasuredValue not found", HttpStatus.NOT_FOUND);
        measuredValueDAORepository.delete(measuredValue.get());
    }


}
