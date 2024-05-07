package com.Fijalkowskim.SpaceFarmManagmentSystem.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
public class CustomHTTPException extends RuntimeException{
    private HttpStatus status;
    public CustomHTTPException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }
}