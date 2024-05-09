package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.CultivationType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.MeasureUnit;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.dictionaries.StageType;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.CultivationTypeRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.MeasureUnitRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageTypeRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.CultivationTypeServiceImpl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.MeasureUnitServiceImpl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.StageTypeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value = "/api/dictionaries")
@CrossOrigin("http://localhost:3000")
public class DictionariesController {
    CultivationTypeServiceImpl cultivationTypeService;
    StageTypeServiceImpl stageTypeService;
    MeasureUnitServiceImpl measureUnitService;

    @Autowired
    public DictionariesController(CultivationTypeServiceImpl cultivationTypeService, StageTypeServiceImpl stageTypeService, MeasureUnitServiceImpl measureUnitService){
        this.cultivationTypeService = cultivationTypeService;
        this.stageTypeService = stageTypeService;
        this.measureUnitService = measureUnitService;
    }

    @GetMapping("/cultivation-types/")
    public Page<CultivationType> getAllCultivationTypes(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return cultivationTypeService.getAllCultivationTypes(pageRequest);
    }
    @GetMapping("/cultivation-types/{id}")
    public ResponseEntity<CultivationType> getCultivationTypeById(
            @PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(cultivationTypeService.getCultivationTypeById(id));
    }
    @PutMapping("/cultivation-types/")
    public ResponseEntity<CultivationType> addCultivationType(
            @RequestPart("CultivationTypeRequest") CultivationTypeRequest cultivationTypeRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cultivationTypeService.addCultivationType(cultivationTypeRequest));
    }
    @DeleteMapping("/cultivation-types/{id}")
    public ResponseEntity<?> deleteCultivationTypeById(
            @PathVariable long id) throws CustomHTTPException {
        cultivationTypeService.deleteCultivationType(id);
        return ResponseEntity.ok("Cultivation type deleted succesfully");
    }
    @PostMapping("/cultivation-types/{id}")
    public ResponseEntity<CultivationType> updateCultivationType(
            @PathVariable long id, @RequestBody CultivationTypeRequest cultivationTypeRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(cultivationTypeService.updateCultivationType(id,cultivationTypeRequest));
    }

    @GetMapping("/stage-types/")
    public Page<StageType> getAllStageTypes(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException{
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return stageTypeService.getAllStageTypes(pageRequest);
    }

    @GetMapping("/stage-types/{id}")
    public ResponseEntity<StageType> getStageTypeById(
            @PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(stageTypeService.getStageTypeById(id));
    }

    @PutMapping("/stage-types/")
    public ResponseEntity<StageType> addStageType(
            @RequestPart("StageTypeRequest") StageTypeRequest stageTypeRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(stageTypeService.addStageType(stageTypeRequest));
    }

    @DeleteMapping("/stage-types/{id}")
    public ResponseEntity<?> deleteStageTypeById(
            @PathVariable long id) throws CustomHTTPException {
        stageTypeService.deleteStageType(id);
        return ResponseEntity.ok("Stage type deleted successfully");
    }

    @PostMapping("/stage-types/{id}")
    public ResponseEntity<StageType> updateStageType(
            @PathVariable long id, @RequestBody StageTypeRequest stageTypeRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(stageTypeService.updateStageType(id,stageTypeRequest));
    }

    @GetMapping("/measure-units/")
    public Page<MeasureUnit> getAllMeasureUnits(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException{
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return measureUnitService.getAllMeasureUnits(pageRequest);
    }

    @GetMapping("/measure-units/{id}")
    public ResponseEntity<MeasureUnit> getMeasureUnitById(
            @PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(measureUnitService.getMeasureUnitById(id));
    }

    @PutMapping("/measure-units/")
    public ResponseEntity<MeasureUnit> addMeasureUnit(
            @RequestPart("MeasureUnitRequest") MeasureUnitRequest measureUnitRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(measureUnitService.addMeasureUnit(measureUnitRequest));
    }

    @DeleteMapping("/measure-units/{id}")
    public ResponseEntity<?> deleteMeasureUnitById(
            @PathVariable long id) throws CustomHTTPException {
        measureUnitService.deleteMeasureUnit(id);
        return ResponseEntity.ok("Measure unit deleted successfully");
    }

    @PostMapping("/measure-units/{id}")
    public ResponseEntity<MeasureUnit> updateMeasureUnit(
            @PathVariable long id, @RequestBody MeasureUnitRequest measureUnitRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(measureUnitService.updateMeasureUnit(id,measureUnitRequest));
    }

}
