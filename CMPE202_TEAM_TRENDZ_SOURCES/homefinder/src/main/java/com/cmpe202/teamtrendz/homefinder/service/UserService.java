package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.User;

import java.util.List;

public interface UserService {
    User createUser(String email, String password, String first_name, String last_name, String user_type);
    Boolean deleteUser(Integer id);
    List<User> getAllUsers();
}
