package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Stage;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Control;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.StageRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.ControlService;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.StageService;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.ControlServiceImpl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.StageServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value = "/api/stage")
@CrossOrigin("http://localhost:3000")
public class StageController {
    private StageServiceImpl stageService;
    public StageController(StageServiceImpl stageService) {
        this.stageService = stageService;
    }

    @GetMapping("")
    public Page<Stage> getStages(@RequestParam(name = "page", defaultValue = "0") int page,
                                 @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return stageService.getStages(pageRequest);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Stage> getStage(@PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(stageService.getStageById(id));
    }
    @GetMapping("/{id}/controls")
    public Page<Control> getStageControls(@RequestParam(name = "page", defaultValue = "0") int page,
                                          @RequestParam(name = "pageSize", defaultValue = "20") int pageSize,
                                          @PathVariable long id) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return stageService.getControlsByStage(pageRequest, id);
    }
    @PutMapping("")
    public ResponseEntity<Stage> addStage(@RequestBody StageRequest stageRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(stageService.addStage(stageRequest));
    }
    @PostMapping("/{id}")
    public ResponseEntity<Stage> updateStage(@PathVariable long id, @RequestBody StageRequest stageRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(stageService.updateStage(id, stageRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStage(@PathVariable long id) throws CustomHTTPException {
        stageService.deleteStage(id);
        return ResponseEntity.ok("Stage deleted successfully");
    }
}
