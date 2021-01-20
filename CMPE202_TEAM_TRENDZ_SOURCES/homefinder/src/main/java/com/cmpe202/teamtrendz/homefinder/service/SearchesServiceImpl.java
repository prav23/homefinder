package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.Application;
import com.cmpe202.teamtrendz.homefinder.model.Searches;
import com.cmpe202.teamtrendz.homefinder.util.ApplicationRowMapper;
import com.cmpe202.teamtrendz.homefinder.util.SearchesRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Service
public class SearchesServiceImpl implements SearchesService {
    private static final Logger logger = LoggerFactory.getLogger(ListingServiceImpl.class);
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Searches> getMySearch(int user_id) {
        logger.info("Get My Search");
        String getQuery = "SELECT * FROM searches WHERE user_id = ?";
        logger.info("SearchesServiceImpl: getMySearch  -- SELECT SQL: " + getQuery);
        try{
            List<Searches> searchesList = jdbcTemplate.query(getQuery, new Object[] {user_id}, new SearchesRowMapper());
            return searchesList;
        }catch(Exception e){
            logger.info("exception: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Searches addMySearch(int user_id, int security_deposit, int min_price, int max_price, int listing_type, boolean is_furnished, int min_sf, int max_sf, int num_baths, int num_beds, int num_parking_spots, boolean pet_policy, boolean smoking_policy) {
        logger.info("Add My Search");
        //duplicate check
        String checkQuery = "SELECT * FROM searches WHERE user_id = ? AND security_deposit = ? AND min_price = ? AND max_price = ? AND listing_type = ? AND is_furnished = ? AND min_sf = ? AND max_sf = ? AND num_baths = ? AND num_beds = ? AND num_parking_spots = ? AND pet_policy = ? AND smoking_policy = ?";
        List<Searches> checkList = jdbcTemplate.query(checkQuery, new Object[] {user_id, security_deposit, min_price, max_price, listing_type, is_furnished, min_sf, max_sf, num_baths, num_beds, num_parking_spots, pet_policy, smoking_policy}, new SearchesRowMapper());
        if(checkList.size() > 0){
            logger.info("Line already exists, not adding anything");
            return null;
        }
        String addQuery = "INSERT INTO searches(user_id, security_deposit, min_price, max_price, listing_type, is_furnished, min_sf, max_sf, num_baths, num_beds, num_parking_spots, pet_policy, smoking_policy) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        logger.info("SearchesServiceImpl: addMySearch -- INSERT SQL: " + addQuery);
        try{
            KeyHolder kh = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(addQuery, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, user_id);
                ps.setInt(2, security_deposit);
                ps.setInt(3, min_price);
                ps.setInt(4, max_price);
                ps.setInt(5, listing_type);
                ps.setBoolean(6, is_furnished);
                ps.setInt(7, min_sf);
                ps.setInt(8, max_sf);
                ps.setInt(9, num_baths);
                ps.setInt(10, num_beds);
                ps.setInt(11, num_parking_spots);
                ps.setBoolean(12, pet_policy);
                ps.setBoolean(13, smoking_policy);
                return ps;
            }, kh);
            if(numRows > 0){
                logger.info("addMySearch -- success");
                Searches searches = jdbcTemplate.queryForObject("SELECT * FROM searches WHERE user_id = ? AND security_deposit = ? AND min_price = ? AND max_price = ? AND listing_type = ? AND is_furnished = ? AND min_sf = ? AND max_sf = ? AND num_baths = ? AND num_beds = ? AND num_parking_spots = ? AND pet_policy = ? AND smoking_policy = ?",
                        new Object[] {user_id, security_deposit, min_price, max_price, listing_type, is_furnished, min_sf, max_sf, num_baths, num_beds, num_parking_spots, pet_policy, smoking_policy},
                        new SearchesRowMapper());
                return searches;
            }
            else{
                logger.error("failed to add search");
                return null;
            }
        }catch (Exception e){
            logger.info("exception: " + e.getMessage());
        }
        return null;
    }
}
