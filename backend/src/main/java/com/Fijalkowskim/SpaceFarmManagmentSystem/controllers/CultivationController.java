package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.CultivationService;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Cultivation;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.CultivationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value = "/api/cultivation")
@CrossOrigin("http://localhost:3000")
public class CultivationController {
    CultivationServiceImpl cultivationService;

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
            @RequestPart("CultivationRequest") CultivationRequest cultivationRequest) throws CustomHTTPException{
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(cultivationService.addCultivation(cultivationRequest));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCultivation(@PathVariable long id) throws CustomHTTPException {
        cultivationService.deleteCultivation(id);
        return ResponseEntity.ok("Cultivation deleted successfully");
    }
    @PostMapping("/{id}")
    public ResponseEntity<Cultivation> updateCultivation(
            @PathVariable long id, @RequestBody CultivationRequest cultivationRequest) throws CustomHTTPException {
        return ResponseEntity.status(HttpStatus.OK).body(cultivationService.updateCultivation(id, cultivationRequest));
    }



}
