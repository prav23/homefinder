package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.LoginCredentials;

public interface LoginService {
    LoginCredentials loginUser(String email, String password);
    Boolean validateAccess(LoginCredentials loginCredentials);
}
