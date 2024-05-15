package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.CultivationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.PersonServiceImpl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;

@RestController
@RequestMapping( value = "/api/cultivation")
@CrossOrigin("http://localhost:3000")
public class CultivationController {
    CultivationServiceImpl cultivationService;
    PersonServiceImpl personService;
    @Autowired
    public CultivationController(CultivationServiceImpl cultivationService) {
        this.cultivationService = cultivationService;
    }

    @GetMapping("/")
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
    @PutMapping("")
    public ResponseEntity<Cultivation> addCultivation(
            @RequestPart("CultivationRequest") CultivationRequest cultivationRequest,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException{
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN || personService.getPersonById(userID).getRole() == WorkerType.MANAGER) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(cultivationService.addCultivation(cultivationRequest));
        }
        else {
            return (ResponseEntity<Cultivation>) ResponseEntity.status(HttpStatus.UNAUTHORIZED);
        }
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



}
