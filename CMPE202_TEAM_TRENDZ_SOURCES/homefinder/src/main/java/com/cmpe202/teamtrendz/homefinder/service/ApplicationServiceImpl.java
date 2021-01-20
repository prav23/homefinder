package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.Application;
import com.cmpe202.teamtrendz.homefinder.model.Listing;
import com.cmpe202.teamtrendz.homefinder.util.ApplicationRowMapper;
import com.cmpe202.teamtrendz.homefinder.util.ListingRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    private static final Logger logger = LoggerFactory.getLogger(ListingServiceImpl.class);
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Application> viewBuyersApplications(int seller_id) {
        logger.info("Get Buyers' Applications");
        String getQuery = "SELECT * FROM applications WHERE seller_id  = ?";
        logger.info("ApplicationServiceImpl: viewBuyersApplications -- SELECT SQL: " + getQuery);
        try{
            List<Application> applications = jdbcTemplate.query(getQuery, new Object[] {seller_id}, new ApplicationRowMapper());
            return applications;
        }catch(Exception e){
            logger.info("exception: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Application manageBuyersApplications(int listing_id, int buyer_id, String newStatus) {
        logger.info("Manage Buyers' Applications");
        String updateQuery = "UPDATE applications SET status = ? WHERE listing_id = ? AND buyer_id = ?";
        logger.info("ApplicationServiceImpl: manageBuyersApplications -- UPDATE SQL: " + updateQuery);
        try{
            KeyHolder kh = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(updateQuery, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, newStatus);
                ps.setInt(2, listing_id);
                ps.setInt(3, buyer_id);
                return ps;
            }, kh);
            if(numRows > 0){
                logger.info("manageBuyersApplications -- success");
                Application updated_listing = jdbcTemplate.queryForObject("SELECT * FROM applications WHERE listing_id = ? AND buyer_id = ?",
                        new Object[]{listing_id, buyer_id},
                        new ApplicationRowMapper());
                return updated_listing;
            }
            else{
                logger.error("failed to update application status in the db");
                return null;
            }
        }catch(Exception e){
            logger.info(e.getMessage());
        }
        return null;
    }

    @Override
    public List<Application> getMyApplications(int buyer_id) {
        logger.info("Get My Applications");
        String getQuery = "SELECT * FROM applications WHERE buyer_id  = ?";
        logger.info("ApplicationServiceImpl: getMyApplications -- SELECT SQL: " + getQuery);
        try{
            List<Application> applications = jdbcTemplate.query(getQuery, new Object[] {buyer_id}, new ApplicationRowMapper());
            return applications;
        }catch(Exception e){
            logger.info("exception: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Application submitApplication(String app_date, int listing_id, int buyer_id, int seller_id, String app_type, String status, Integer price) {
        logger.info("Create a new application");
        //duplicate check
        String checkQuery = "SELECT * FROM applications WHERE app_date = ? AND listing_id = ? AND buyer_id = ? AND seller_id = ? AND app_type = ? AND status = ? AND price = ?";
        List<Application> checkList = jdbcTemplate.query(checkQuery, new Object[] {app_date, listing_id, buyer_id, seller_id, app_type, status, price}, new ApplicationRowMapper());
        if(checkList.size() > 0){
            logger.info("Line already exists, not adding anything");
            return null;
        }

        String postQuery = "INSERT INTO applications(app_date, listing_id, buyer_id, seller_id, app_type, status, price) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
        logger.info("ApplicationServiceImpl: submitApplications -- INSERT SQL: " + postQuery);
        try{
            KeyHolder kh = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(postQuery, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, app_date);
                ps.setInt(2, listing_id);
                ps.setInt(3, buyer_id);
                ps.setInt(4, seller_id);
                ps.setString(5, app_type);
                ps.setString(6, status);
                ps.setInt(7, price);
                return ps;
            }, kh);
            if(numRows > 0){
                logger.info("submitApplications -- success");
                Application updated_listing = jdbcTemplate.queryForObject("SELECT * FROM applications WHERE listing_id = ? AND buyer_id = ?",
                        new Object[]{listing_id, buyer_id},
                        new ApplicationRowMapper());
                return updated_listing;
            }
            else{
                logger.error("failed to submit application");
                return null;
            }
        }catch(Exception e){
            logger.info(e.getMessage());
        }
        return null;
    }
}
