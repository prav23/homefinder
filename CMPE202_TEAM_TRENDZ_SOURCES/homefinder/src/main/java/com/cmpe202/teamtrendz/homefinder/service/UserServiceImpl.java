package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.User;
import com.cmpe202.teamtrendz.homefinder.util.UserRowMapper;
import com.google.common.hash.Hashing;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.InvalidResultSetAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private static final Logger logger = LogManager.getLogger(UserServiceImpl.class);
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

    @Override
    public Boolean deleteUser(Integer id){
        logger.info("Delete user with id " + id);
        String delete_user_query = "DELETE FROM user WHERE id = ?";
        logger.info("UserServiceImpl: deleteUser -- DELETE SQL: " + delete_user_query);
        try{
            if(jdbcTemplate.update(delete_user_query,id) == 0){
                logger.info("deletion failed for user id: "+ id);
                return false;
            }
            else{
                logger.info("successfully deleted user with id: "+ id);
            }
        }
        catch (EmptyResultDataAccessException e){
            logger.info("exception: "+ e);
        }
        return true;
    }

    @Override
    public List<User> getAllUsers(){
        logger.info("Get all users");
        String query = "SELECT * FROM user";
        logger.info("UserServiceImpl: getAllUsers -- SELECT SQL: " + query);
        try{
            List<User> users = jdbcTemplate.query(query, new Object[] {}, new UserRowMapper());
            return users;
        }
        catch (InvalidResultSetAccessException e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public User createUser(String email, String password, String first_name, String last_name, String user_type) {
        logger.info("Create a new user");
        String add_user_query = "INSERT INTO user(email, password, first_name, last_name, user_type)" +
                "VALUES (?, ?, ?, ?, ?)";
        logger.info("CreateUser -- INSERT SQL: " + add_user_query);

        String serverPasswordHash = calculatePassword(email + password);
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(add_user_query, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, email);
                ps.setString(2, serverPasswordHash);
                ps.setString(3, first_name);
                ps.setString(4, last_name);
                ps.setString(5, user_type);
                return ps;
            }, keyHolder);

            if (numRows > 0) {
                logger.info("createUser -- success");
                User new_user_record = jdbcTemplate.queryForObject("SELECT * FROM user WHERE id = ?",
                        new Object[]{keyHolder.getKey()},
                        new UserRowMapper());
                return new_user_record;
            } else {
                logger.error("failed to create new user record in the db");
                return null;
            }
        }
        catch (InvalidResultSetAccessException e){
            throw new RuntimeException(e);
        }
        catch (DataAccessException e){
            throw new RuntimeException(e);
        }
    }
}
