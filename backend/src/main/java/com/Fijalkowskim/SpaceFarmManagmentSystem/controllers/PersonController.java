package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
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
    public ResponseEntity<Person> addPerson(
            @RequestPart("PersonRequest") PersonRequest personRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(personService.addPerson(personRequest));
    }

    @PutMapping("/responsible")
    public ResponseEntity<?> addResponsiblePersonToCultivation(
            @RequestParam("personId") long personId,
            @RequestParam("cultivationId") long cultivationId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(personService.addResponsiblePersonToCultivation(personId, cultivationId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable long id) throws CustomHTTPException {
        personService.deletePerson(id);
        return ResponseEntity.ok("Person deleted successfully.");
    }

    @DeleteMapping("/responsible")
    public ResponseEntity<?> deleteResponsiblePersonFromCultivation(
            @RequestParam(name = "personId") long personId,
            @RequestParam(name = "cultivationId") long cultivationId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(personService.deleteResponsiblePersonFromCultivation(personId, cultivationId));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Person> updatePerson(
            @PathVariable long id, @RequestBody PersonRequest personRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(personService.updatePerson(id,personRequest));
    }
}
