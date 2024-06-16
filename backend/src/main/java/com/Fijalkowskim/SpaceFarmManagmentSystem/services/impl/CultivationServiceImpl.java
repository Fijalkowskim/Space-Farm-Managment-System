package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Station;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.PersonDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.StationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.MultipleIdRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.CultivationService;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Transactional
@Service
public class CultivationServiceImpl implements CultivationService {
    private final CultivationDAORepository cultivationDAORepository;
    private final PersonDAORepository personDAORepository;
    private final StationDAORepository stationDAORepository;

    @Autowired
    public CultivationServiceImpl(CultivationDAORepository cultivationDAORepository, PersonDAORepository personDAORepository, StationDAORepository stationDAORepository) {
        this.cultivationDAORepository = cultivationDAORepository;
        this.personDAORepository = personDAORepository;
        this.stationDAORepository = stationDAORepository;
    }

    public Page<Cultivation> getCultivations(PageRequest pageRequest){
        return cultivationDAORepository.findAll(pageRequest);
    }
    public Cultivation getCultivationById(long id) throws CustomHTTPException {
        Optional<Cultivation> cultivation = cultivationDAORepository.findById(id);
        if(cultivation.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        return cultivation.get();
    }
    public Cultivation addCultivation(CultivationRequest cultivationRequest) throws CustomHTTPException {
        Cultivation cultivation = Cultivation.builder()
                .startDate(cultivationRequest.getStartDate())
                .type(cultivationRequest.getType())
                .area(cultivationRequest.getArea())
                .plannedFinishDate(cultivationRequest.getPlannedFinishDate())
                .realFinishDate(cultivationRequest.getRealFinishDate() != null ? cultivationRequest.getRealFinishDate() : null)
                .plant(cultivationRequest.getPlant())
                .stages(new HashSet<>())
                .harvests(new HashSet<>())
                .stations(new HashSet<>())
                .responsibleWorkers(new HashSet<>())
                .comment(cultivationRequest.getComment())
                .build();
        return cultivationDAORepository.save(cultivation);
    }
    public void deleteCultivation(long id) throws CustomHTTPException{
        Optional<Cultivation> cultivation = cultivationDAORepository.findById(id);
        if(cultivation.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        cultivationDAORepository.deleteById(id);
    }
    public Cultivation updateCultivation(long id, CultivationRequest cultivationRequest){
        Optional<Cultivation> oldCultivation = cultivationDAORepository.findById(id);
        if(oldCultivation.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        if(cultivationRequest.getPlannedFinishDate() != null &&
                oldCultivation.get().getPlannedFinishDate() != null &&
                cultivationRequest.getPlannedFinishDate().before(oldCultivation.get().getStartDate())){
            throw new CustomHTTPException("Planned finish date cannot be earlier then start date", HttpStatus.BAD_REQUEST);
        }
        if(cultivationRequest.getRealFinishDate() != null &&
           oldCultivation.get().getRealFinishDate() != null &&
                cultivationRequest.getRealFinishDate().before(oldCultivation.get().getStartDate())){
            throw new CustomHTTPException("Real finish date cannot be earlier then start date", HttpStatus.BAD_REQUEST);
        }

        Cultivation cultivation = Cultivation.builder()
                .startDate(cultivationRequest.getStartDate())
                .type(cultivationRequest.getType())
                .area(cultivationRequest.getArea())
                .plannedFinishDate(cultivationRequest.getPlannedFinishDate())
                .realFinishDate(cultivationRequest.getRealFinishDate())
                .plant(cultivationRequest.getPlant())
                .stages(oldCultivation.get().getStages())
                .harvests(oldCultivation.get().getHarvests())
                .stations(oldCultivation.get().getStations())
                .responsibleWorkers(oldCultivation.get().getResponsibleWorkers())
                .comment(cultivationRequest.getComment())
                .id(oldCultivation.get().getId())
                .build();

        return cultivationDAORepository.save(cultivation);
    }


    public boolean isPersonAssignedToCultivation(Long cultivationId, Long personId) {
        return cultivationDAORepository.existsByCultivationIdAndPersonId(cultivationId, personId);
    }


    public Set<Cultivation> getCultvitationsByPersonId(long personId) {
        return cultivationDAORepository.findAllByWorkerId(personId);
    }

    public Cultivation addCultivationToPerson(long cultivationId, long personId) throws CustomHTTPException {
        Optional<Person> personOptional = personDAORepository.findById(personId);
        if(personOptional.isEmpty()){
            throw new CustomHTTPException("Person not found", HttpStatus.NOT_FOUND);
        }
        Optional<Cultivation> cultivationOptional = cultivationDAORepository.findById(cultivationId);
        if(cultivationOptional.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        Person person = personOptional.get();
        Cultivation cultivation = cultivationOptional.get();
        cultivation.getResponsibleWorkers().add(person);
        cultivationDAORepository.save(cultivation);
        return cultivation;
    }

    public Cultivation deleteCultivationFromPerson(long cultivationId, long personId) throws CustomHTTPException {
        Optional<Person> personOptional = personDAORepository.findById(personId);
        Optional<Cultivation> cultivationOptional = cultivationDAORepository.findById(cultivationId);

        if (personOptional.isEmpty()) {
            throw new CustomHTTPException("Person not found", HttpStatus.NOT_FOUND);
        }

        if (cultivationOptional.isEmpty()) {
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }

        Person person = personOptional.get();
        Cultivation cultivation = cultivationOptional.get();

        cultivation.getResponsibleWorkers().remove(person);
        cultivationDAORepository.save(cultivation);
        return cultivation;
    }

    public Cultivation addCultivationToStation(long cultivationId, long stationId) {
        Optional<Station> stationOptional = stationDAORepository.findById(stationId);
        if(stationOptional.isEmpty()) throw new CustomHTTPException("Station not found", HttpStatus.NOT_FOUND);

        Optional<Cultivation> cultivationOptional = cultivationDAORepository.findById(cultivationId);
        if (cultivationOptional.isEmpty()) throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);

        Station station = stationOptional.get();
        Cultivation cultivation = cultivationOptional.get();
        cultivation.getStations().add(station);
        return cultivationDAORepository.save(cultivation);
    }

    public Cultivation deleteCultivationFromStation(long cultivationId, long stationId) {
        Optional<Station> stationOptional = stationDAORepository.findById(stationId);
        if(stationOptional.isEmpty()) throw new CustomHTTPException("Station not found", HttpStatus.NOT_FOUND);

        Optional<Cultivation> cultivationOptional = cultivationDAORepository.findById(cultivationId);
        if (cultivationOptional.isEmpty()) throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);

        Station station = stationOptional.get();
        Cultivation cultivation = cultivationOptional.get();
        cultivation.getStations().remove(station);
        return cultivationDAORepository.save(cultivation);
    }

    public Set<Cultivation> getCultivationsByStageId(long stationId) {
        Optional<Station> stationOptional = stationDAORepository.findById(stationId);
        if(stationOptional.isEmpty()) throw new CustomHTTPException("Station not found", HttpStatus.NOT_FOUND);
        return cultivationDAORepository.findAllByStationId(stationId);
    }

    public Set<Cultivation> getActiveCultivations() {
        return cultivationDAORepository.findAllActiveCultivations();
    }

    public Set<Cultivation> getFinishedCultivations() {
        return cultivationDAORepository.findAllFinishedCultivations();
    }

    public Cultivation setCultivationFinishDate(long id, String realFinishDate) {
        Optional<Cultivation> cultivationOptional = cultivationDAORepository.findById(id);
        if(cultivationOptional.isEmpty()){
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        Cultivation cultivation = cultivationOptional.get();
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date finishDate = dateFormat.parse(realFinishDate);
            if (finishDate.before(cultivation.getStartDate())) {
                throw new CustomHTTPException("Finish date must be later than start date", HttpStatus.BAD_REQUEST);
            }
            cultivation.setRealFinishDate(finishDate);
            cultivationDAORepository.save(cultivation);
            return cultivation;
        } catch (ParseException e) {
            throw new CustomHTTPException("Date parse exception", HttpStatus.NOT_FOUND);
        }
    }

    public Cultivation addCultivationToMultipleStations(long id, MultipleIdRequest multipleIdRequest) {
        Optional<Cultivation> cultivationOptional = cultivationDAORepository.findById(id);
        if (cultivationOptional.isEmpty()) {
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        Cultivation cultivation = cultivationOptional.get();

        Set<Station> newStations = Arrays.stream(multipleIdRequest.getIds())
                .mapToObj(stationId -> {
                    Optional<Station> foundStation = stationDAORepository.findById(stationId);
                    if (foundStation.isEmpty()) throw new CustomHTTPException("Given station not found", HttpStatus.BAD_REQUEST);
                    return foundStation.get();
                })
                .collect(Collectors.toSet());

        Set<Station> existingStations = new HashSet<>(cultivation.getStations());

        // Remove old associations
        for (Station station : existingStations) {
            if (!newStations.contains(station)) {
                cultivation.removeStation(station.getId());
            }
        }

        // Add new associations
        for (Station station : newStations) {
            if (!existingStations.contains(station)) {
                cultivation.addStation(station);
            }
        }

        // Save all updated stations in one go
        stationDAORepository.saveAll(existingStations);
        stationDAORepository.saveAll(newStations);

        // Save the updated cultivation
        return cultivationDAORepository.save(cultivation);
    }

    public Cultivation addCultivationToMultiplePersons(long id, MultipleIdRequest multipleIdRequest) {
        Optional<Cultivation> cultivationOptional = cultivationDAORepository.findById(id);
        if (cultivationOptional.isEmpty()) {
            throw new CustomHTTPException("Cultivation not found", HttpStatus.NOT_FOUND);
        }
        Cultivation cultivation = cultivationOptional.get();

        Set<Person> newPersons = Arrays.stream(multipleIdRequest.getIds())
                .mapToObj(stationId -> {
                    Optional<Person> foundPerson = personDAORepository.findById(stationId);
                    if (foundPerson.isEmpty()) throw new CustomHTTPException("Given person not found", HttpStatus.BAD_REQUEST);
                    return foundPerson.get();
                })
                .collect(Collectors.toSet());

        Set<Person> existingPersons = new HashSet<>(cultivation.getResponsibleWorkers());

        // Remove old associations
        for (Person station : existingPersons) {
            if (!newPersons.contains(station)) {
                cultivation.removePerson(station.getId());
            }
        }

        // Add new associations
        for (Person station : newPersons) {
            if (!existingPersons.contains(station)) {
                cultivation.addPerson(station);
            }
        }

        // Save all updated stations in one go
        personDAORepository.saveAll(existingPersons);
        personDAORepository.saveAll(newPersons);

        // Save the updated cultivation
        return cultivationDAORepository.save(cultivation);
    }

}
