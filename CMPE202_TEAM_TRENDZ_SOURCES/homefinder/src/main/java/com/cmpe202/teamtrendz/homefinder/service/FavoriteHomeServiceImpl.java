package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.Application;
import com.cmpe202.teamtrendz.homefinder.model.FavoriteHome;
import com.cmpe202.teamtrendz.homefinder.util.ApplicationRowMapper;
import com.cmpe202.teamtrendz.homefinder.util.FavoriteHomeRowMapper;
import com.mysql.cj.x.protobuf.MysqlxPrepare;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Service
public class FavoriteHomeServiceImpl implements FavoriteHomeService {
    private static final Logger logger = LoggerFactory.getLogger(ListingServiceImpl.class);
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<FavoriteHome> getFavoriteHomes(int user_id) {
        logger.info("Get Favorite Homes");
        String getQuery = "SELECT * FROM favorite_homes WHERE user_id = ?";
        logger.info("FavoriteHomeServiceImpl: getFavoriteHomes -- SELECT SQL: " + getQuery);
        try {
            List<FavoriteHome> favoriteHomes = jdbcTemplate.query(getQuery, new Object[] {user_id}, new FavoriteHomeRowMapper());
            return favoriteHomes;
        } catch (Exception e) {
            logger.info("exception: " + e.getMessage());
        }
       return null;
    }

    @Override
    public FavoriteHome addFavoriteHome(int user_id, String user_type, int listing_id) {
        logger.info("Add Favorite Home");
        //duplicate check
        String checkQuery = "SELECT * FROM favorite_homes WHERE user_id = ? AND listing_id = ?";
        List<FavoriteHome> checkList = jdbcTemplate.query(checkQuery, new Object[] {user_id, listing_id}, new FavoriteHomeRowMapper());
        if(checkList.size() > 0){
            logger.info("Line already exists, not adding anything");
            return null;
        }
        String addQuery = "INSERT INTO favorite_homes(user_id, user_type, listing_id) " +
                "VALUES (?, ?, ?)";
        logger.info("FavoriteHomeServiceImpl: addFavoriteHome -- INSERT SQL: " + addQuery);
        try {
            KeyHolder kh = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(addQuery, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, user_id);
                ps.setString(2, user_type);
                ps.setInt(3, listing_id);
                return ps;
            }, kh);

            if (numRows > 0) {
                logger.info("addFavoriteHome -- success");
                FavoriteHome favoriteHome = jdbcTemplate.queryForObject("SELECT * FROM favorite_homes WHERE user_id = ? AND listing_id = ?",
                        new Object[]{user_id, listing_id},
                        new FavoriteHomeRowMapper());
                return favoriteHome;
            } else {
                logger.error("failed to add favorite home");
                return null;
            }
        } catch (Exception e) {
            logger.info("exception: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Boolean deleteFavoriteHome(int user_id, int listing_id) {
        logger.info("Delete favorite home of user " + user_id);
        String deleteQuery = "DELETE FROM favorite_homes WHERE user_id = ? AND listing_id = ?";
        logger.info("FavoriteHomeServiceImpl: deleteFavoriteHomes -- DELETE SQL: " + deleteQuery);
        try{
            if(jdbcTemplate.update(deleteQuery, user_id, listing_id) == 0){
                logger.info("deletion failed for user: " + user_id);
                return false;
            }
            else{
                logger.info("successfully deleted favorite home for user: " + user_id);
            }
        }catch(EmptyResultDataAccessException e){
            logger.info("exception: " + e.getMessage());
        }
        return true;
    }
}
