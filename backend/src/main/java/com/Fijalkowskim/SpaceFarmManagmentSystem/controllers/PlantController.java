package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PlantRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.PlantServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value = "/api/plant")
@CrossOrigin("http://localhost:3000")
public class PlantController {
    PlantServiceImpl plantService;
    @Autowired
    public PlantController(PlantServiceImpl plantService){
        this.plantService = plantService;
    }

    @GetMapping("")
    public Page<Plant> getPlants(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return plantService.getPlants(pageRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlant(
            @PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(plantService.getPlantById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlant(@PathVariable long id) throws CustomHTTPException {
        plantService.deletePlant(id);
        return ResponseEntity.ok("Plant deleted successfully.");
    }
    @PutMapping("")
    public ResponseEntity<Plant> addPlant(
            @RequestBody PlantRequest plantRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.CREATED).body(plantService.addPlant(plantRequest));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Plant> updatePlant(@PathVariable long id, @RequestBody PlantRequest plantRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(plantService.updatePlant(id,plantRequest));
    }
}
