package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.CultivationService;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.PersonService;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.CultivationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.PersonServiceImpl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;

import java.util.Set;

@RestController
@RequestMapping( value = "/api/cultivation")
@CrossOrigin("http://localhost:3000")
public class CultivationController {
    CultivationServiceImpl cultivationService;
    PersonServiceImpl personService;
    @Autowired
    public CultivationController(CultivationServiceImpl cultivationService, PersonServiceImpl personService) {
        this.cultivationService = cultivationService;
        this.personService = personService;
    }

    @GetMapping("")
    public Page<Cultivation> getAllCultivations(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return cultivationService.getCultivations(pageRequest);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Cultivation> getCultivationById(@PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationService.getCultivationById(id));
    }

    @GetMapping("/active/")
    public ResponseEntity<Set<Cultivation>> getActiveCultivations() {
        return ResponseEntity.ok(cultivationService.getActiveCultivations());
    }
    @GetMapping("/finished/")
    public ResponseEntity<Set<Cultivation>> getFinishedCultivations() {
        return ResponseEntity.ok(cultivationService.getFinishedCultivations());
    }
    @PostMapping("/active/{id}")
    public ResponseEntity<Cultivation> setCultivationFinishDate(@PathVariable Long id, @RequestParam String realFinishDate) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationService.setCultivationFinishDate(id, realFinishDate));
    }

    @PutMapping("")
    public ResponseEntity<?> addCultivation(
            @RequestBody CultivationRequest cultivationRequest,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException{
        if (!(personService.getPersonById(userID).getRole() == WorkerType.ADMIN ||
                personService.getPersonById(userID).getRole() == WorkerType.MANAGER)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: User does not have permission to perform this action.");
        }

        if (cultivationRequest.getStartDate() == null ||
                cultivationRequest.getStartDate().getYear() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Incorrect start date.");
        }

        if (cultivationRequest.getPlannedFinishDate() == null || cultivationRequest.getPlannedFinishDate().getDate() <= cultivationRequest.getStartDate().getDate()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Incorrect finish date.");
        }

        if (Float.isNaN(cultivationRequest.getArea()) ||
                cultivationRequest.getArea() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Incorrect area.");
        }

        if (cultivationRequest.getPlant() == null ||
                cultivationRequest.getPlant().getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Plant not specified.");
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cultivationService.addCultivation(cultivationRequest));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCultivation(@PathVariable long id, @RequestParam(name = "userID") long userID) throws CustomHTTPException {
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN || personService.getPersonById(userID).getRole() == WorkerType.MANAGER) {
            cultivationService.deleteCultivation(id);
            return ResponseEntity.ok("Cultivation deleted successfully");
        }
        else {
            return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
        }
    }
    @PostMapping("/{id}")
    public ResponseEntity<?> updateCultivation(
            @PathVariable long id, @RequestBody CultivationRequest cultivationRequest,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException {
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN || personService.getPersonById(userID).getRole() == WorkerType.MANAGER || cultivationService.isPersonAssignedToCultivation(id, userID)) {
            cultivationService.updateCultivation(id, cultivationRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Cultivation updated successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
    }
    @GetMapping("/person/")
    public ResponseEntity<Set<Cultivation>> getCultvitationsByPersonId(
            @RequestParam(name = "personId") long personId) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationService.getCultvitationsByPersonId(personId));
    }
    @PutMapping("/person/")
    public ResponseEntity<Cultivation> addCultivationToPerson(
            @RequestParam(name = "cultivationId") long cultivationId,
            @RequestParam(name = "personId") long personId) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationService.addCultivationToPerson(cultivationId, personId));
    }
    @DeleteMapping("/person/")
    public ResponseEntity<Cultivation> deleteCultivationFromPerson(
            @RequestParam(name = "cultivationId") long cultivationId,
            @RequestParam(name = "personId") long personId) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationService.deleteCultivationFromPerson(cultivationId, personId));
    }
    @GetMapping("/station/") ResponseEntity<Set<Cultivation>> getCultivationsByStationId(
            @RequestParam(name = "stationId") long stationId
    ){
        return ResponseEntity.ok(cultivationService.getCultivationsByStageId(stationId));
    }
    @PutMapping("/station/") ResponseEntity<Cultivation> addCultivationToStation(
            @RequestParam(name = "cultivationId") long cultivationId,
            @RequestParam(name = "stationId") long stationId
    ) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationService.addCultivationToStation(cultivationId, stationId));
    }

    @DeleteMapping("/station/") ResponseEntity<Cultivation> removeCultivationFromStation(
            @RequestParam(name = "cultivationId") long cultivationId,
            @RequestParam(name = "stationId") long stationId
    ) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationService.deleteCultivationFromStation(cultivationId, stationId));
    }
}
