package com.example.partmaster.exception;

/**
 * Custom exception for handling cases where the Group ID or Group Name does not exist in the database.
 */
public class GroupNotFoundException extends RuntimeException {

    /**
     * Constructs a new GroupNotFoundException with the specified detail message.
     *
     * @param message the detail message.
     */
    public GroupNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new GroupNotFoundException with the specified detail message and cause.
     *
     * @param message the detail message.
     * @param cause the cause of the exception.
     */
    public GroupNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
