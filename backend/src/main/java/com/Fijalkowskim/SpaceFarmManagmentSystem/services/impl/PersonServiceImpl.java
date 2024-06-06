package com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Person;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.CultivationDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.repositories.PersonDAORepository;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PersonCreateRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.responsemodels.PersonResponse;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
public class PersonServiceImpl implements PersonService {
    private final PersonDAORepository personDAORepository;
    private final CultivationDAORepository cultivationDAORepository;

    @Autowired
    public PersonServiceImpl(PersonDAORepository personDAORepository, CultivationDAORepository cultivationDAORepository) {
        this.personDAORepository = personDAORepository;
        this.cultivationDAORepository = cultivationDAORepository;
    }

    public Page<PersonResponse> getPersons(PageRequest pageRequest) {
        return personResponsePageFromPersonPage(personDAORepository.findAll(pageRequest));
    }

    public PersonResponse getPersonById(long id) throws CustomHTTPException {
        Optional<Person> person = personDAORepository.findById(id);
        if (person.isEmpty()){
            throw new CustomHTTPException("Person not found", HttpStatus.NOT_FOUND);
        }
        return personResponseFromPerson(person.get());
    }
    public Set<PersonResponse> getResponsiblePersonsByCultivationId(long cultivationId) {
        return personDAORepository.findAllByCultivations_Id(cultivationId).stream().map(this::personResponseFromPerson).collect(Collectors.toSet());
    }

    public void deletePerson(long id) throws CustomHTTPException{
        Optional<Person> person = personDAORepository.findById(id);
        if(person.isEmpty()) throw new CustomHTTPException("Person not found", HttpStatus.NOT_FOUND);
        personDAORepository.delete(person.get());
    }

    public Person addPerson(PersonCreateRequest personRequest) throws CustomHTTPException {
        Person person = Person.builder()
                .name(personRequest.getName())
                .surname(personRequest.getSurname())
                .login(personRequest.getLogin())
                .password(personRequest.getPassword())
                .role(personRequest.getRole())
                .cultivations(new HashSet<>())
                .build();
        return personDAORepository.save(person);
    }

    public Person addResponsiblePersonToCultivation(long personId, long cultivationId) throws CustomHTTPException {
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

        cultivation.getResponsibleWorkers().add(person);
        cultivationDAORepository.save(cultivation);
        return person;
    }

    public Person deleteResponsiblePersonFromCultivation(long personId, long cultivationId) throws CustomHTTPException {
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
        if(!cultivationDAORepository.existsByCultivationIdAndPersonId(personId, cultivationId)){
            throw new CustomHTTPException("Responsible person doesn't exist", HttpStatus.NOT_FOUND);
        }

        cultivation.getResponsibleWorkers().remove(person);
        cultivationDAORepository.save(cultivation);
        return person;
    }

    public Person updatePerson(long id, PersonCreateRequest personRequest) throws CustomHTTPException{
        Optional<Person> oldPerson = personDAORepository.findById(id);
        if(oldPerson.isEmpty()) throw new CustomHTTPException("Person not found", HttpStatus.NOT_FOUND);
        Person newPerson = Person.builder()
                .name(personRequest.getName())
                .surname(personRequest.getSurname())
                .login(personRequest.getLogin())
                .password(personRequest.getPassword())
                .role(personRequest.getRole())
                .cultivations(new HashSet<>())
                .id(oldPerson.get().getId())
                .build();
        return personDAORepository.save(newPerson);
    }

    public Person changePassword(long id, String newPassword, String oldPassword) {
        Optional<Person> personOptional = personDAORepository.findById(id);
        if(personOptional.isEmpty()) throw new CustomHTTPException("Person not found", HttpStatus.NOT_FOUND);
        Person person = personOptional.get();
        if(person.getPassword().equals(oldPassword)) {
            person.setPassword(newPassword);
        }
        else{
            throw new CustomHTTPException("Old password is wrong", HttpStatus.UNAUTHORIZED);
        }
        return personDAORepository.save(personOptional.get());
    }


    public PersonResponse login(String login, String password) {
        Optional<Person> personOptional = personDAORepository.findByLogin(login);
        if(personOptional.isEmpty()) throw new CustomHTTPException("Person not found", HttpStatus.NOT_FOUND);
        if(!personOptional.get().getPassword().equals(password)) throw new CustomHTTPException("Wrong password", HttpStatus.UNAUTHORIZED);
        return personResponseFromPerson(personOptional.get());
    }
    private PersonResponse personResponseFromPerson(final Person person){
        return PersonResponse.builder()
                .id(person.getId())
                .name(person.getName())
                .surname(person.getSurname())
                .role(person.getRole())
                .cultivations(person.getCultivations())
                .build();
    }
    private Page<PersonResponse> personResponsePageFromPersonPage(final Page<Person> personPage) {
        return personPage.map(this::personResponseFromPerson);
    }
}
