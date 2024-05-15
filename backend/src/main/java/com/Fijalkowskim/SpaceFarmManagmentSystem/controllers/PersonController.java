package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PersonRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.PersonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping( value = "/api/person")
@CrossOrigin("http://localhost:3000")
public class PersonController {
    PersonServiceImpl personService;
    @Autowired
    public PersonController(PersonServiceImpl personService) {
        this.personService = personService;
    }

    @GetMapping("/")
    public Page<Person> getAllPersons(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return personService.getPersons(pageRequest);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(
            @PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(personService.getPersonById(id));
    }

    @GetMapping("/responsible")
    public ResponseEntity<Set<Person>> getResponsiblePersonsByCultivationId(
            @RequestParam(name = "cultivationId") long cultivationId) {
        return ResponseEntity.ok(personService.getResponsiblePersonsByCultivationId(cultivationId));
    }

    @PutMapping("")
    public ResponseEntity<?> addPerson(
            @RequestPart("PersonRequest") PersonRequest personRequest,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException{
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN) {
            personService.addPerson(personRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Person has been successfully added");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
        }
    }

    @PutMapping("/responsible")
    public ResponseEntity<?> addResponsiblePersonToCultivation(
            @RequestParam("personId") long personId,
            @RequestParam("cultivationId") long cultivationId,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException{
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN || personService.getPersonById(userID).getRole() == WorkerType.MANAGER) {
            personService.addResponsiblePersonToCultivation(personId, cultivationId);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Responsible person has been successfully added");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePerson(
            @PathVariable long id,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException
    {
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN) {
            personService.deletePerson(id);
            return ResponseEntity.ok("Person has been deleted successfully.");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
        }
    }

    @DeleteMapping("/responsible")
    public ResponseEntity<?> deleteResponsiblePersonFromCultivation(
            @RequestParam(name = "personId") long personId,
            @RequestParam(name = "cultivationId") long cultivationId,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException{
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN || personService.getPersonById(userID).getRole() == WorkerType.MANAGER) {
            personService.deleteResponsiblePersonFromCultivation(personId, cultivationId);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Responsible person has been deleted successfully.");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updatePerson(
            @PathVariable long id, @RequestBody PersonRequest personRequest,
            @RequestParam(name = "userID") long userID) throws CustomHTTPException{
        if (personService.getPersonById(userID).getRole() == WorkerType.ADMIN) {
            personService.updatePerson(id, personRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Persons data has been updated");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User does not have permission to perform this action.");
        }
    }
}
