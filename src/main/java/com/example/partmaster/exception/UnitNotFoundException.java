package com.example.partmaster.exception;

public class UnitNotFoundException extends RuntimeException {
    public UnitNotFoundException(String message) {
        super(message);
    }
}