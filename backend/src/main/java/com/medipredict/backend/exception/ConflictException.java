package com.medipredict.backend.exception;

public class ConflictException extends ApiException {
    public ConflictException(String message) {
        super(message);
    }
}
