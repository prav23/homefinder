package com.cmpe202.teamtrendz.homefinder.util;

import com.cmpe202.teamtrendz.homefinder.model.FavoriteHome;
import com.cmpe202.teamtrendz.homefinder.service.FavoriteHomeServiceImpl;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FavoriteHomeRowMapper implements RowMapper<FavoriteHome> {

    @Override
    public FavoriteHome mapRow(ResultSet rs, int rowNum) throws SQLException {
        FavoriteHome favoriteHome = new FavoriteHome();
        favoriteHome.setUser_id(rs.getInt("user_id"));
        favoriteHome.setUser_type(rs.getString("user_type"));
        favoriteHome.setListing_id(rs.getInt("listing_id"));
        return favoriteHome;
    }
}
