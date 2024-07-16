package com.example.partmaster.exception;

public class PartNotFoundException extends RuntimeException {
    
    public PartNotFoundException(String message) {
        super(message);
    }
}