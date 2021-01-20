package com.cmpe202.teamtrendz.homefinder.util;

import com.cmpe202.teamtrendz.homefinder.model.Searches;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SearchesRowMapper implements RowMapper<Searches> {

    @Override
    public Searches mapRow(ResultSet rs, int rowNum) throws SQLException {
        Searches searches = new Searches();
        searches.setUser_id(rs.getInt("user_id"));
        searches.setSecurity_deposit(rs.getInt("security_deposit"));
        searches.setMin_price(rs.getInt("min_price"));
        searches.setMax_price(rs.getInt("max_price"));
        searches.setListing_type(rs.getInt("listing_type"));
        searches.setIs_furnished(rs.getBoolean("is_furnished"));
        searches.setMin_sf(rs.getInt("min_sf"));
        searches.setMax_sf(rs.getInt("max_sf"));
        searches.setNum_baths(rs.getInt("num_baths"));
        searches.setNum_beds(rs.getInt("num_beds"));
        searches.setNum_parking_spots(rs.getInt("num_parking_spots"));
        searches.setPet_policy(rs.getBoolean("pet_policy"));
        searches.setSmoking_policy(rs.getBoolean("smoking_policy"));
        return searches;
    }
}
