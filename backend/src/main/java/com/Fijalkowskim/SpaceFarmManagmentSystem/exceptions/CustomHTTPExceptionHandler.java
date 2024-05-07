package com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomHTTPExceptionHandler {
    @ExceptionHandler({CustomHTTPException.class})
    public ResponseEntity<CustomHTTPExceptionResponse> handleRuntimeException(CustomHTTPException exception) {
        return ResponseEntity
                .status(exception.getStatus())
                .body(new CustomHTTPExceptionResponse(exception.getMessage(), exception.getStatus()));
    }
}