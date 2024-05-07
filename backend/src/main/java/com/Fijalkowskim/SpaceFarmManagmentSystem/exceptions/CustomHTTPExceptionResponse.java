package com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CustomHTTPExceptionResponse {
    private String message;
    private HttpStatus status;
    public CustomHTTPExceptionResponse(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
    public CustomHTTPExceptionResponse() {

    }
}
