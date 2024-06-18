package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ControlDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.MeasuredValueDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.ReadingDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.ReadingRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class ReadingServiceImpl implements ReadingService {
    private final ReadingDAORepository readingDAORepository;
    private final ControlDAORepository controlDAORepository;
    private final MeasuredValueDAORepository measuredValueDAORepository;

    @Autowired
    public ReadingServiceImpl(ReadingDAORepository readingDAORepository, ControlDAORepository controlDAORepository, MeasuredValueDAORepository measuredValueDAORepository) {
        this.readingDAORepository = readingDAORepository;
        this.controlDAORepository = controlDAORepository;
        this.measuredValueDAORepository = measuredValueDAORepository;
    }

    public Page<Reading> getReadings(PageRequest pageRequest) {
        return readingDAORepository.findAll(pageRequest);
    }

    public Reading getReadingById(long id) {
        Optional<Reading> reading = readingDAORepository.findById(id);
        if(reading.isEmpty()) throw new CustomHTTPException("Reading not found", HttpStatus.NOT_FOUND);
        return reading.get();
    }

    public Reading addReading(ReadingRequest readingRequest) {
        Optional<Control> control = controlDAORepository.findById(readingRequest.getControlId());
        if(control.isEmpty()) throw new CustomHTTPException("Control not found", HttpStatus.NOT_FOUND);
        Optional<MeasuredValue> measuredValue = measuredValueDAORepository.findById(readingRequest.getMeasuredValueId());
        if(measuredValue.isEmpty()) throw new CustomHTTPException("MeasuredValue not found", HttpStatus.NOT_FOUND);
        Reading reading = Reading.builder()
                .control(control.get())
                .measuredValue(measuredValue.get())
                .value(readingRequest.getValue())
                .build();
        measuredValue.get().getReadings().add(reading);
        measuredValueDAORepository.save(measuredValue.get());
        control.get().getReadings().add(reading);
        controlDAORepository.save(control.get());
        return readingDAORepository.save(reading);
    }

    public Reading updateReading(long id, ReadingRequest readingRequest) {
        Optional<Control> control = controlDAORepository.findById(readingRequest.getControlId());
        if(control.isEmpty()) throw new CustomHTTPException("Control not found", HttpStatus.NOT_FOUND);
        Optional<MeasuredValue> measuredValue = measuredValueDAORepository.findById(readingRequest.getMeasuredValueId());
        if(measuredValue.isEmpty()) throw new CustomHTTPException("MeasuredValue not found", HttpStatus.NOT_FOUND);
        //Czy będzie można modyfikować id powiązań przy updateach? Jeśli tak to chyba trzeba te sety posprzątać i zaktualizować
        Optional<Reading> oldReading = readingDAORepository.findById(id);
        if(oldReading.isEmpty()) throw new CustomHTTPException("Reading not found", HttpStatus.NOT_FOUND);
        Reading reading = Reading.builder()
                .value(readingRequest.getValue())
                .control(control.get())
                .measuredValue(measuredValue.get())
                .id(oldReading.get().getId())
                .build();
        return readingDAORepository.save(reading);
    }

    public void deleteReading(long id) {
        Optional<Reading> reading = readingDAORepository.findById(id);
        if(reading.isEmpty()) throw new CustomHTTPException("Reading not found", HttpStatus.NOT_FOUND);
        readingDAORepository.delete(reading.get());
    }

    public Page<Reading> getReadingsByControl(PageRequest pageRequest, long id) {
        Optional<Control> control = controlDAORepository.findById(id);
        if(control.isEmpty()) throw new CustomHTTPException("Control not found", HttpStatus.NOT_FOUND);
        return readingDAORepository.findReadingByControl(control.get(), pageRequest);
    }
}
