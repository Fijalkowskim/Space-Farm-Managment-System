package com.Fijalkowskim.SpaceFarmManagmentSystem.controllers;

import com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions.CustomHTTPException;
import com.Fijalkowskim.SpaceFarmManagmentSystem.requestmodels.ReadingRequest;
import com.Fijalkowskim.SpaceFarmManagmentSystem.services.impl.ReadingServiceImpl;
import com.Fijalkowskim.SpaceFarmManagmentSystem.models.Reading;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value = "/api/reading")
@CrossOrigin("http://localhost:3000")
public class ReadingController {
    private final ReadingServiceImpl readingService;
    public ReadingController(ReadingServiceImpl readingService) {
        this.readingService = readingService;
    }
    @GetMapping("/")
    public Page<Reading> getReadings(@RequestParam(name = "page", defaultValue = "0") int page,
                                     @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return readingService.getReadings(pageRequest);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Reading> getReading(@PathVariable long id) throws CustomHTTPException {
        return ResponseEntity.ok(readingService.getReadingById(id));
    }
    @PutMapping("")
    public ResponseEntity<Reading> addReading(@RequestPart("ReadingRequest") ReadingRequest readingRequest) throws CustomHTTPException {
        return ResponseEntity.status(HttpStatus.CREATED).body(readingService.addReading(readingRequest));
    }
    @PostMapping("/{id}")
    public ResponseEntity<Reading> updateReading(@PathVariable long id, @RequestPart ReadingRequest readingRequest) throws CustomHTTPException {
        return ResponseEntity.status(HttpStatus.OK).body(readingService.updateReading(id, readingRequest));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReading(@PathVariable long id) throws CustomHTTPException {
        readingService.deleteReading(id);
        return ResponseEntity.ok("Reading deleted successfully");
    }
}
