package com.cmpe202.teamtrendz.homefinder.resource;

import com.cmpe202.teamtrendz.homefinder.model.User;
import com.cmpe202.teamtrendz.homefinder.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserResource {

    private static final Logger logger = LogManager.getLogger(UserResource.class);
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService){ this.userService = userService; }

    @PostMapping("/register")
    @ApiOperation(value = "Inserts a user object into the user table",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = User.class)
    public User registerUser(@ApiParam(value = "email", required = true) @RequestParam String email,
                             @ApiParam(value = "password", required = true) @RequestParam String password,
                             @ApiParam(value = "first_name", required = true) @RequestParam String first_name,
                             @ApiParam(value = "last_name", required = true) @RequestParam String last_name,
                             @ApiParam(value = "user_type", required = true) @RequestParam String user_type) {

        logger.info("UserResource::registerUser with email: " + email);
        return userService.createUser(email, password, first_name, last_name, user_type);
    }

    @PostMapping("/delete")
    @ApiOperation(value = "Deletes a user object from the user table")
    public Boolean deleteUser(@ApiParam(value = "id", required = true) @RequestParam Integer id) {

        logger.info("UserResource::deleteUser with id: " + id);
        return userService.deleteUser(id);
    }

    @GetMapping("/getAllUsers")
    @ApiOperation(value = "Gets all user objects from the user table",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = User.class)
    public List<User> getAllUsers() {

        logger.info("UserResource::getAllUsers");
        return userService.getAllUsers();
    }

}
