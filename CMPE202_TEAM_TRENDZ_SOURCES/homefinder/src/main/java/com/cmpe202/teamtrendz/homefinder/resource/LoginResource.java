package com.cmpe202.teamtrendz.homefinder.resource;

import com.cmpe202.teamtrendz.homefinder.model.LoginCredentials;
import com.cmpe202.teamtrendz.homefinder.service.LoginService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class LoginResource {

    private static final Logger logger = LogManager.getLogger(LoginResource.class);
    private LoginService loginService;

    @Autowired
    public void setLoginService(LoginService loginService){ this.loginService = loginService;}

    @PostMapping("/login")
    @ApiOperation(value = "Logs into system with email and password",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = LoginCredentials.class)
    public LoginCredentials loginUser(@ApiParam(value = "email", required = true) @RequestParam String email,
                          @ApiParam(value = "password", required = true) @RequestParam String password) {

        logger.info("UserResource::loginUser with email: " + password);
        return loginService.loginUser(email, password);
    }

    @PostMapping("/checkAccess")
    @ApiOperation(value = "Verify access with given Login Credentials",
                notes = "Checks given accessToken with server calculated access token",
                response = Boolean.class)
    public Boolean checkAccess(@ApiParam(value = "Login Credentials to verify", required = true) @RequestBody LoginCredentials loginCredentials){
        return loginService.validateAccess(loginCredentials);
    }
}
