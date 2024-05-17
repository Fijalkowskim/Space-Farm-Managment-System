package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;
import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.MeasuredValue;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.MeasuredValueRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.MeasuredValueServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value = "/api/measuredValue")
@CrossOrigin("http://localhost:3000")
public class MeasuredValueController {
    MeasuredValueServiceImpl measuredValueService;

    @Autowired
    public MeasuredValueController(MeasuredValueServiceImpl measuredValueService) {this.measuredValueService = measuredValueService;}

    @GetMapping("/")
    public ResponseEntity<Page<MeasuredValue>> getMeasuredValues(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize) throws CustomHTTPException {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return ResponseEntity.ok(measuredValueService.getMeasuredValues(pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeasuredValue> getMeasuredValue(@PathVariable long id) {
        return ResponseEntity.ok(measuredValueService.getMeasuredValueById(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeasuredValue(@PathVariable long id) throws CustomHTTPException {
        measuredValueService.deleteMeasuredValue(id);
        return ResponseEntity.ok("Measured Value deleted successfully.");
    }
    @PutMapping("")
    public ResponseEntity<MeasuredValue> addMeasuredValue(
            @RequestPart("MeasuredValueRequest") MeasuredValueRequest measuredValueRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(measuredValueService.addMeasuredValue(measuredValueRequest));
    }
    @PostMapping("/{id}")
    public ResponseEntity<MeasuredValue> updateMeasuredValue(
            @PathVariable long id, @RequestBody MeasuredValueRequest measuredValueRequest) throws CustomHTTPException{
        return ResponseEntity.status(HttpStatus.OK).body(measuredValueService.updateMeasuredValue(id,measuredValueRequest));
    }
}
