package com.example.partmaster.exception;

public class PartAlreadyExistsException extends RuntimeException {
    public PartAlreadyExistsException(String message) {
        super(message);
    }
}