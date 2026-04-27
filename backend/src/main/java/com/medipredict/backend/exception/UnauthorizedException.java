package com.medipredict.backend.exception;

public class UnauthorizedException extends ApiException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
