package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.LoginCredentials;
import com.cmpe202.teamtrendz.homefinder.model.User;
import com.cmpe202.teamtrendz.homefinder.util.UserRowMapper;
import com.google.common.base.Preconditions;
import com.google.common.hash.Hashing;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;

@Service
public class LoginServiceImpl implements LoginService{

    private static final Logger logger = LogManager.getLogger(LoginServiceImpl.class);
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private String calculatePassword(String credentialString) {
        return Hashing.sha256()
                .hashString(credentialString, StandardCharsets.UTF_8)
                .toString();
    }

    private String getUserPassword(String email) {
        String result = "";
        try {
            String query = "SELECT password FROM user WHERE email = ?";
            result = jdbcTemplate.queryForObject(query, new Object[]{email}, String.class);
        } catch(EmptyResultDataAccessException e) {
            logger.info("getUserPassword() -- no db record found");
        }
        return result;
    }

    private String getUserType(String email) {
        String result = "";
        try {
            String query = "SELECT user_type FROM user WHERE email = ?";
            result = jdbcTemplate.queryForObject(query, new Object[]{email}, String.class);
        } catch(EmptyResultDataAccessException e) {
            logger.info("getUserPassword() -- no db record found");
        }
        return result;
    }

    private String getFirstName(String email) {
        String result = "";
        try {
            String query = "SELECT first_name FROM user WHERE email = ?";
            result = jdbcTemplate.queryForObject(query, new Object[]{email}, String.class);
        } catch(EmptyResultDataAccessException e) {
            logger.info("getUserPassword() -- no db record found");
        }
        return result;
    }

    private Integer getUserID(String email) {
        Integer result = 0;
        try {
            String query = "SELECT id FROM user WHERE email = ?";
            result = jdbcTemplate.queryForObject(query, new Object[]{email}, Integer.class);
        } catch(EmptyResultDataAccessException e) {
            logger.info("getUserPassword() -- no db record found");
        }
        return result;
    }


    private String generateAccessToken(String username, String serverPasswordHash, Long timestamp) {
        return Hashing.sha256()
                .hashString(username + serverPasswordHash + timestamp, StandardCharsets.UTF_8)
                .toString();
    }


    @Override
    public LoginCredentials loginUser(String email, String password){
        logger.info("loginUser() -- email: " + email + "password: "+ password);
        Preconditions.checkArgument(!StringUtils.isEmpty(email) && !StringUtils.isEmpty(password),
                "invalid email and/or password supplied");
        String clientPasswordHash = calculatePassword(email + password);
        logger.info("login() -- clientSecret: " + clientPasswordHash);
        String serverPasswordHash = getUserPassword(email);
        String userType = getUserType(email);
        String first_name = getFirstName(email);
        Integer user_id = getUserID(email);

        logger.info("login() -- comparing clientSecret: " + clientPasswordHash + ", serverSecret: " + serverPasswordHash);

        long timestamp = System.currentTimeMillis();

        if (StringUtils.isEmpty(serverPasswordHash)) {
            logger.error("login() -- user record not found..");
            return new LoginCredentials(email, LoginCredentials.INVALID_ACCESS_TOKEN, timestamp, LoginCredentials.LoginStatus.UNKNOWN_USER, userType, first_name, user_id);
        }

        if (!clientPasswordHash.equals(serverPasswordHash)) {
            logger.error("login() -- user record found but passwords does not match..");
            return new LoginCredentials(email, LoginCredentials.INVALID_ACCESS_TOKEN, timestamp, LoginCredentials.LoginStatus.INVALID_CREDS, userType, first_name, user_id);
        }

        // email and password match, indicate success
        String accessToken = generateAccessToken(email, serverPasswordHash, timestamp);
        return new LoginCredentials(email, accessToken, timestamp, LoginCredentials.LoginStatus.OK, userType, first_name, user_id);

    }

    @Override
    public Boolean validateAccess(LoginCredentials loginCredentials) {
        String email = loginCredentials.getEmail();
        Long timestamp = loginCredentials.getTimestamp();
        String clientAccessToken = loginCredentials.getAccessToken();
        if (StringUtils.isEmpty(email) || timestamp == null || StringUtils.isEmpty(clientAccessToken)) {
            logger.error("validateAccess -- one or more of the supplied credentials is missing/invalid");
            logger.error(("validateAccess -- username: \"" + email + "\", timestamp: " + timestamp
                    + ", accessToken: \"" + clientAccessToken + "\""));
            return false;
        }

        String serverPasswordHash = getUserPassword(email);
        if (serverPasswordHash.isEmpty()) {
            logger.info("validateAccess() -- no password(encrypted) found for email: " + email);
            return false;
        }
        String serverAccessToken = generateAccessToken(email, serverPasswordHash, timestamp);

        Boolean result = clientAccessToken.equals(serverAccessToken);
        logger.info("validateAccess() -- client vs server access tokens: " + result);
        return result;
    }

}


