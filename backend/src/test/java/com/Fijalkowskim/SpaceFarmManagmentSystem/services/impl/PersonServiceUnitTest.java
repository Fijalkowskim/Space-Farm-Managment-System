package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.WorkerType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.PersonDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PersonCreateRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.responsemodels.PersonResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


public class PersonServiceUnitTest {
    @Mock
    private PersonDAORepository personDAORepository;

    @Mock
    private CultivationDAORepository cultivationDAORepository;

    @InjectMocks
    private PersonServiceImpl personService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetPersons() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        Person person = new Person();
        Page<Person> personPage = new PageImpl<>(Collections.singletonList(person));

        when(personDAORepository.findAll(pageRequest)).thenReturn(personPage);

        Page<PersonResponse> result = personService.getPersons(pageRequest);

        assertEquals(1, result.getTotalElements());
        verify(personDAORepository, times(1)).findAll(pageRequest);
    }

    @Test
    public void testGetPersonById_PersonExists() throws CustomHTTPException {
        Person person = new Person();
        person.setId(1L);

        when(personDAORepository.findById(1L)).thenReturn(Optional.of(person));

        PersonResponse result = personService.getPersonById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testGetPersonById_PersonNotFound() {
        when(personDAORepository.findById(1L)).thenReturn(Optional.empty());

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.getPersonById(1L));

        assertEquals("Person not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testGetResponsiblePersonsByCultivationId() {
        Person person = new Person();
        Set<Person> persons = new HashSet<>();
        persons.add(person);

        when(personDAORepository.findAllByCultivations_Id(1L)).thenReturn(persons);

        Set<PersonResponse> result = personService.getResponsiblePersonsByCultivationId(1L);

        assertEquals(1, result.size());
        verify(personDAORepository, times(1)).findAllByCultivations_Id(1L);
    }

    @Test
    public void testDeletePerson_PersonExists() throws CustomHTTPException {
        Person person = new Person();
        when(personDAORepository.findById(1L)).thenReturn(Optional.of(person));

        personService.deletePerson(1L);

        verify(personDAORepository, times(1)).findById(1L);
        verify(personDAORepository, times(1)).delete(person);
    }

    @Test
    public void testDeletePerson_PersonNotFound() {
        when(personDAORepository.findById(1L)).thenReturn(Optional.empty());

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.deletePerson(1L));

        assertEquals("Person not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testAddPerson() {
        PersonCreateRequest request = new PersonCreateRequest();
        request.setName("John");
        request.setSurname("Doe");
        request.setLogin("johndoe");
        request.setPassword("password");
        request.setRole(WorkerType.LABWORKER);

        Person person = new Person();
        person.setName("John");
        person.setSurname("Doe");
        person.setLogin("johndoe");
        person.setPassword("password");
        person.setRole(WorkerType.LABWORKER);

        when(personDAORepository.save(any(Person.class))).thenReturn(person);

        Person result = personService.addPerson(request);

        assertNotNull(result);
        assertEquals("John", result.getName());
        verify(personDAORepository, times(1)).save(any(Person.class));
    }

    @Test
    public void testAddResponsiblePersonToCultivation_PersonNotFound() {
        when(personDAORepository.findById(1L)).thenReturn(Optional.empty());

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.addResponsiblePersonToCultivation(1L, 1L));

        assertEquals("Person not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testDeleteResponsiblePersonFromCultivation_PersonAndCultivationExist() throws CustomHTTPException {
        Person person = new Person();
        Cultivation cultivation = new Cultivation();
        when(personDAORepository.findById(1L)).thenReturn(Optional.of(person));
        when(cultivationDAORepository.findById(1L)).thenReturn(Optional.of(cultivation));

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.deleteResponsiblePersonFromCultivation(1L, 1L));

        assertEquals("Responsible person doesn't exist", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testDeleteResponsiblePersonFromCultivation_PersonNotFound() {
        when(personDAORepository.findById(1L)).thenReturn(Optional.empty());

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.deleteResponsiblePersonFromCultivation(1L, 1L));

        assertEquals("Person not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testDeleteResponsiblePersonFromCultivation_CultivationNotFound() {
        Person person = new Person();
        when(personDAORepository.findById(1L)).thenReturn(Optional.of(person));
        when(cultivationDAORepository.findById(1L)).thenReturn(Optional.empty());

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.deleteResponsiblePersonFromCultivation(1L, 1L));

        assertEquals("Cultivation not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
        verify(cultivationDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testUpdatePerson_PersonExists() throws CustomHTTPException {
        Person oldPerson = new Person();
        oldPerson.setId(1L);
        when(personDAORepository.findById(1L)).thenReturn(Optional.of(oldPerson));

        PersonCreateRequest request = new PersonCreateRequest();
        request.setName("John");
        request.setSurname("Doe");
        request.setLogin("johndoe");
        request.setPassword("password");
        request.setRole(WorkerType.LABWORKER);

        Person newPerson = new Person();
        newPerson.setId(1L);
        newPerson.setName("John");
        newPerson.setSurname("Doe");
        newPerson.setLogin("johndoe");
        newPerson.setPassword("password");
        newPerson.setRole(WorkerType.LABWORKER);

        when(personDAORepository.save(any(Person.class))).thenReturn(newPerson);

        Person result = personService.updatePerson(1L, request);

        assertNotNull(result);
        assertEquals("John", result.getName());
        verify(personDAORepository, times(1)).findById(1L);
        verify(personDAORepository, times(1)).save(any(Person.class));
    }

    @Test
    public void testUpdatePerson_PersonNotFound() {
        when(personDAORepository.findById(1L)).thenReturn(Optional.empty());

        PersonCreateRequest request = new PersonCreateRequest();
        request.setName("John");
        request.setSurname("Doe");
        request.setLogin("johndoe");
        request.setPassword("password");
        request.setRole(WorkerType.LABWORKER);

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.updatePerson(1L, request));

        assertEquals("Person not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testChangePassword_PersonExistsOldPasswordIncorrect() {
        Person person = new Person();
        person.setId(1L);
        person.setPassword("oldPassword");
        when(personDAORepository.findById(1L)).thenReturn(Optional.of(person));

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.changePassword(1L, "newPassword", "wrongPassword"));

        assertEquals("Old password is wrong", exception.getMessage());
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testChangePassword_PersonNotFound() {
        when(personDAORepository.findById(1L)).thenReturn(Optional.empty());

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.changePassword(1L, "newPassword", "oldPassword"));

        assertEquals("Person not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findById(1L);
    }

    @Test
    public void testLogin_PersonExistsPasswordCorrect() {
        Person person = new Person();
        person.setId(1L);
        person.setLogin("johndoe");
        person.setPassword("password");
        when(personDAORepository.findByLogin("johndoe")).thenReturn(Optional.of(person));

        PersonResponse result = personService.login("johndoe", "password");

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(personDAORepository, times(1)).findByLogin("johndoe");
    }

    @Test
    public void testLogin_PersonExistsPasswordIncorrect() {
        Person person = new Person();
        person.setId(1L);
        person.setLogin("johndoe");
        person.setPassword("password");
        when(personDAORepository.findByLogin("johndoe")).thenReturn(Optional.of(person));

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.login("johndoe", "wrongPassword"));

        assertEquals("Wrong password", exception.getMessage());
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        verify(personDAORepository, times(1)).findByLogin("johndoe");
    }

    @Test
    public void testLogin_PersonNotFound() {
        when(personDAORepository.findByLogin("johndoe")).thenReturn(Optional.empty());

        CustomHTTPException exception = assertThrows(CustomHTTPException.class, () -> personService.login("johndoe", "password"));

        assertEquals("Person not found", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        verify(personDAORepository, times(1)).findByLogin("johndoe");
    }
}
