package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.Application;
import com.cmpe202.teamtrendz.homefinder.model.Listing;
import com.cmpe202.teamtrendz.homefinder.util.ApplicationRowMapper;
import com.cmpe202.teamtrendz.homefinder.util.ListingRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.InvalidResultSetAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Service
public class ListingServiceImpl implements ListingService {

    private static final Logger logger = LoggerFactory.getLogger(ListingServiceImpl.class);
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Listing> getAllListings(){  // I added a try catch here.
        logger.info("Get all listings");
        String query = "SELECT * FROM listing";
        logger.info("ListingServiceImpl: getAllListings -- SELECT SQL: " + query);
        try{
            List<Listing> listings = jdbcTemplate.query(query, new Object[] {}, new ListingRowMapper());
            return listings;
        }catch(Exception e){
            logger.info("exception: " + e.getMessage());
        }
        return null;
    }

    public List<Listing> getListing(){
        return null;
    }

    @Override
    public Listing postListing(String title, String description, Integer security_deposit, String building_number, String apartment, String street_name, String city, String state, String zip_code, String country, Integer listing_price, Integer distance, Integer listing_status, Integer listing_type, Integer listing_user, Integer listing_views, Boolean is_furnished, Integer square_footage, Integer num_baths, Integer num_beds, Integer num_parking_spots, Boolean pet_policy, Boolean smoking_policy){
        logger.info("Create a new posting");
        //duplicate check
        String checkQuery = "SELECT * FROM listing WHERE title = ? AND description = ? AND security_deposit = ? AND building_number = ? AND apartment = ? AND street_name = ? AND city = ? AND state = ? AND zip_code = ? AND country = ? AND listing_price = ? AND distance = ? AND listing_status = ? AND listing_type = ? AND listing_user = ? AND listing_views = ? AND is_furnished = ? AND square_footage = ? AND num_baths = ? AND num_beds = ? AND num_parking_spots = ? AND pet_policy = ? AND smoking_policy = ?";
        List<Listing> checkList = jdbcTemplate.query(checkQuery, new Object[] {title, description, security_deposit, building_number, apartment,
                street_name, city, state, zip_code, country, listing_price, distance, listing_status,
                listing_type, listing_user, listing_views, is_furnished, square_footage, num_baths,
                num_beds, num_parking_spots, pet_policy, smoking_policy}, new ListingRowMapper());
        if(checkList.size() > 0){
            logger.info("Line already exists, not adding anything");
            return null;
        }
        String add_listing_query = "INSERT INTO listing(title, description, security_deposit, building_number, apartment, street_name, city, state, zip_code, country, listing_price, distance, listing_status, listing_type, listing_user, listing_views, is_furnished, square_footage, num_baths, num_beds, num_parking_spots, pet_policy, smoking_policy)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        logger.info("ListingServiceImpl: postListing -- INSERT SQL: " + add_listing_query);

        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(add_listing_query, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, title);
                ps.setString(2, description);
                ps.setInt(3, security_deposit);
                ps.setString(4, building_number);
                ps.setString(5, apartment);
                ps.setString(6, street_name);
                ps.setString(7, city);
                ps.setString(8, state);
                ps.setString(9, zip_code);
                ps.setString(10, country);
                ps.setInt(11, listing_price);
                ps.setInt(12, distance);
                ps.setInt(13, listing_status);
                ps.setInt(14, listing_type);
                ps.setInt(15, listing_user);
                ps.setInt(16, listing_views);
                ps.setBoolean(17, is_furnished);
                ps.setInt(18, square_footage);
                ps.setInt(19, num_baths);
                ps.setInt(20, num_beds);
                ps.setInt(21, num_parking_spots);
                ps.setBoolean(22, pet_policy);
                ps.setBoolean(23, smoking_policy);
                return ps;
            }, keyHolder);

            if (numRows > 0) {
                logger.info("postListing -- success");
                Listing new_listing = jdbcTemplate.queryForObject("SELECT * FROM listing WHERE id = ?",
                        new Object[]{keyHolder.getKey()},
                        new ListingRowMapper());
                return new_listing;
            } else {
                logger.error("failed to create new listing in the db");
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

    @Override
    public Listing updateListing(Integer id, String title, String description, Integer security_deposit, String building_number, String apartment, String street_name, String city, String state, String zip_code, String country, Integer listing_price, Integer distance, Integer listing_status, Integer listing_type, Integer listing_user, Integer listing_views, Boolean is_furnished, Integer square_footage, Integer num_baths, Integer num_beds, Integer num_parking_spots, Boolean pet_policy, Boolean smoking_policy){
        logger.info("Update posting with id " + id);
        String update_listing_query = "UPDATE listing SET title = ?, description = ?, security_deposit = ?, building_number = ?, apartment = ?, street_name = ?, city = ?, state = ?, zip_code = ?, country = ?, listing_price = ?, distance = ?, listing_status = ?, listing_type = ?, listing_user = ?, listing_views = ?, is_furnished = ?, square_footage = ?, num_baths = ?, num_beds = ?, num_parking_spots = ?, pet_policy = ?, smoking_policy = ? " +
                "WHERE id = ?";
        logger.info("ListingServiceImpl: updateListing -- UPDATE SQL: " + update_listing_query);

        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(update_listing_query, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, title);
                ps.setString(2, description);
                ps.setInt(3, security_deposit);
                ps.setString(4, building_number);
                ps.setString(5, apartment);
                ps.setString(6, street_name);
                ps.setString(7, city);
                ps.setString(8, state);
                ps.setString(9, zip_code);
                ps.setString(10, country);
                ps.setInt(11, listing_price);
                ps.setInt(12, distance);
                ps.setInt(13, listing_status);
                ps.setInt(14, listing_type);
                ps.setInt(15, listing_user);
                ps.setInt(16, listing_views);
                ps.setBoolean(17, is_furnished);
                ps.setInt(18, square_footage);
                ps.setInt(19, num_baths);
                ps.setInt(20, num_beds);
                ps.setInt(21, num_parking_spots);
                ps.setBoolean(22, pet_policy);
                ps.setBoolean(23, smoking_policy);
                ps.setInt(24, id);
                return ps;
            }, keyHolder);

            if (numRows > 0) {
                logger.info("updateListing -- success");
                Listing updated_listing = jdbcTemplate.queryForObject("SELECT * FROM listing WHERE id = ?",
                        new Object[]{id},
                        new ListingRowMapper());
                return updated_listing;
            } else {
                logger.error("failed to update listing in the db");
                return null;
            }
        }
        catch (EmptyResultDataAccessException e) {
            logger.info("updateListing: SQLException" + e);
        }
        return null;
    }

    @Override
    public Boolean deleteListing(Integer id){
        logger.info("Delete posting with id " + id);
        String delete_listing_query = "DELETE FROM listing WHERE id = ?";
        logger.info("ListingServiceImpl: deleteListing -- DELETE SQL: " + delete_listing_query);
        try{
            if(jdbcTemplate.update(delete_listing_query,id) == 0){
                logger.info("deletion failed for listing id: "+ id);
                return false;
            }
            else{
                logger.info("successfully deleted listing with id: "+ id);
            }
        }
        catch (EmptyResultDataAccessException e){
            logger.info("exception: "+ e);
        }
        return true;
    }
}
