package com.cmpe202.teamtrendz.homefinder.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Objects;

@ApiModel(description = "Represents a single login object model")
public class LoginCredentials {

    public static String INVALID_ACCESS_TOKEN = "-";

    public enum LoginStatus {
        OK("OK"), UNKNOWN_USER("UNKNOWN_USER"), INVALID_CREDS("INVALID_CREDS");
        private String loginStatus;
        LoginStatus(String loginStatus) {
            this.loginStatus = loginStatus;
        }
        @Override
        public String toString() {
            return loginStatus;
        }
    }

    @ApiModelProperty(notes = "The status of the login attempt")
    private LoginStatus loginStatus;

    @ApiModelProperty(notes = "The email for the user logging in")
    private String email;

    @ApiModelProperty(notes = "The access token associated with the login session")
    private String accessToken;

    @ApiModelProperty(notes = "The user id associated with the login session")
    private Integer user_id;

    @ApiModelProperty(notes = "The user type associated with the login session")
    private String user_type;

    @ApiModelProperty(notes = "The first name associated with the login session")
    private String first_name;

    @ApiModelProperty(notes = "The timestamp for the start of the login session")
    private Long timestamp;

    public LoginCredentials() {
        loginStatus = LoginStatus.INVALID_CREDS;
        email = null;
        accessToken = INVALID_ACCESS_TOKEN;
        timestamp = null;
        user_type = null;
        first_name = null;
        user_id = 0;
    }

    public LoginCredentials(String email, String accessToken, Long timestamp, LoginStatus loginStatus, String user_type, String first_name,Integer user_id) {
        this.email = email;
        this.accessToken = accessToken;
        this.timestamp = timestamp;
        this.loginStatus = loginStatus;
        this.user_type = user_type;
        this.first_name = first_name;
        this.user_id = user_id;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public LoginStatus getLoginStatus() {
        return loginStatus;
    }

    public void setLoginStatus(LoginStatus loginStatus) {
        this.loginStatus = loginStatus;
    }

    public String getFirst_name() {return first_name; }

    public String getUser_type() {return user_type; }

    public Integer getUser_id() {return user_id; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginCredentials that = (LoginCredentials) o;
        return email.equals(that.email) &&
                accessToken.equals(that.accessToken) &&
                timestamp.equals(that.timestamp) &&
                user_type.equals(that.user_type) &&
                first_name.equals(that.first_name) &&
                user_id.equals(that.user_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, accessToken, loginStatus, timestamp, user_type, first_name, user_id);
    }

    @Override
    public String toString() {
        return "LoginCredentials{" +
                "email='" + email + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", loginStatus='" + loginStatus + '\'' +
                ", timestamp=" + timestamp +
                ", user_type=" + user_type +
                ", first_name=" + first_name +
                ", user_id=" + user_id +
                '}';
    }
}
