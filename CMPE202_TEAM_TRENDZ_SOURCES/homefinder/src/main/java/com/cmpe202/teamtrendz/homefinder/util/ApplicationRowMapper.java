package com.cmpe202.teamtrendz.homefinder.util;

import com.cmpe202.teamtrendz.homefinder.model.Application;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ApplicationRowMapper implements RowMapper<Application> {
    @Override
    public Application mapRow(ResultSet rs, int rowNum) throws SQLException {
        Application application = new Application();
        application.setApp_date(rs.getString("app_date"));
        application.setListing_id(rs.getInt("listing_id"));
        application.setBuyer_id(rs.getInt("buyer_id"));
        application.setSeller_id(rs.getInt("seller_id"));
        application.setApp_type(rs.getString("app_type"));
        application.setStatus(rs.getString("status"));
        application.setPrice(rs.getInt("price"));
        return application;
    }
}
