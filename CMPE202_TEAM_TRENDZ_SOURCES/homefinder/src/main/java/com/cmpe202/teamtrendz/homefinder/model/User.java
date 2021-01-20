package com.cmpe202.teamtrendz.homefinder.model;

import java.util.Objects;

public class User {
    private int id;
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private String user_type;

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getUser_type() {
        return user_type;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return getId() == user.getId() &&
                Objects.equals(getEmail(), user.getEmail()) &&
                Objects.equals(getPassword(), user.getPassword()) &&
                Objects.equals(getFirst_name(), user.getFirst_name()) &&
                Objects.equals(getLast_name(), user.getLast_name()) &&
                Objects.equals(getUser_type(), user.getUser_type());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmail(), getPassword(), getFirst_name(), getLast_name(), getUser_type());
    }
}
