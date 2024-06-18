package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Plant;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.ControlRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.PlantRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.ControlServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value = "/api/control")
@CrossOrigin("http://localhost:3000")
public class ControlController {
    ControlServiceImpl controlService;

    @Autowired
    public ControlController(ControlServiceImpl controlService) {this.controlService = controlService;}

    @GetMapping("")
    public ResponseEntity<Page<Control>> getControls(@RequestParam(name = "page", defaultValue = "0") int page,
                                     @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return ResponseEntity.ok(controlService.getControls(pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Control> getControl(@PathVariable long id) {
        return ResponseEntity.ok(controlService.getControlById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteControl(@PathVariable long id) throws CustomHTTPException {
        controlService.deleteControl(id);
        return ResponseEntity.ok("Control deleted successfully.");
    }

    @PutMapping("")
    public ResponseEntity<Control> addControl(@RequestBody ControlRequest controlRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.CREATED).body(controlService.addControl(controlRequest));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Control> updateControl(@PathVariable long id, @RequestBody ControlRequest controlRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(controlService.updateControl(id,controlRequest));
    }

    @GetMapping("/stage/{id}")
    public Page<Control> getControlsByStageId(@RequestParam(name = "page", defaultValue = "0") int page,
                                                @RequestParam(name = "pageSize", defaultValue = "20") int pageSize,
                                                @PathVariable long id) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return controlService.getControlsByStageId(pageRequest, id);
    }
}
