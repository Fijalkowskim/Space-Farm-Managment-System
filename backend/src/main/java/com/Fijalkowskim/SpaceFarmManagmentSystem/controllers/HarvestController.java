package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Harvest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.HarvestRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.HarvestServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping( value = "/api/harvest")
@CrossOrigin("http://localhost:3000")
public class HarvestController {
    private final HarvestServiceImpl harvestService;
    public HarvestController(HarvestServiceImpl harvestService) {
        this.harvestService = harvestService;
    }

    @GetMapping("")
    public Page<Harvest> getHarvests(@RequestParam(name = "page", defaultValue = "0") int page,
                                     @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return harvestService.getHarvests(pageRequest);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Harvest> getHarvest(@PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(harvestService.getHarvestById(id));
    }
    @GetMapping("/cultivation/{cultivationId}")
    public ResponseEntity<Set<Harvest>> getStagesByCultivationId(@PathVariable long cultivationId){
        return ResponseEntity.ok(harvestService.getStagesByCultivationId(cultivationId));

    }
    @PutMapping("")
    public ResponseEntity<Harvest> addHarvest(@RequestBody HarvestRequest harvestRequest) throws CustomHTTPException {
        return ResponseEntity.status(HttpStatus.CREATED).body(harvestService.addHarvest(harvestRequest));
    }
    @PostMapping("/{id}")
    public ResponseEntity<Harvest> updateHarvest(@PathVariable long id, @RequestBody HarvestRequest harvestRequest) throws CustomHTTPException {
        return ResponseEntity.status(HttpStatus.OK).body(harvestService.updateHarvest(id, harvestRequest));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHarvest(@PathVariable long id) throws CustomHTTPException {
        harvestService.deleteHarvest(id);
        return ResponseEntity.ok("Harvest deleted successfully");
    }
}
