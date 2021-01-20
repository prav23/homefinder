package com.cmpe202.teamtrendz.homefinder.util;

import com.cmpe202.teamtrendz.homefinder.model.Listing;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ListingRowMapper implements RowMapper<Listing> {
    @Override
    public Listing mapRow(ResultSet rs, int rowNum) throws SQLException {
        Listing listing = new Listing();
        listing.setId(rs.getInt("id"));
        listing.setTitle(rs.getString("title"));
        listing.setDescription(rs.getString("description"));
        listing.setSecurityDeposit(rs.getInt("security_deposit"));
        listing.setBuildingNum(rs.getString("building_number"));
        listing.setApartment(rs.getString("apartment"));
        listing.setStreetName(rs.getString("street_name"));
        listing.setCity(rs.getString("city"));
        listing.setState(rs.getString("state"));
        listing.setZipCode(rs.getString("zip_code"));
        listing.setCountry(rs.getString("country"));
        listing.setPrice(rs.getInt("listing_price"));
        listing.setDistance(rs.getInt("distance"));
        listing.setListingStatus(rs.getInt("listing_status"));
        listing.setListingType(rs.getInt("listing_type"));
        listing.setListingUser(rs.getInt("listing_user"));
        listing.setListingView(rs.getInt("listing_views"));
        listing.setFurnished(rs.getBoolean("is_furnished"));
        listing.setSquareFeet(rs.getInt("square_footage"));
        listing.setNumBaths(rs.getInt("num_baths"));
        listing.setNumBeds(rs.getInt("num_beds"));
        listing.setNumParkingSpots(rs.getInt("num_parking_spots"));
        listing.setPetPolicy(rs.getBoolean("pet_policy"));
        listing.setSmokingPolicy(rs.getBoolean("smoking_policy"));
        return listing;
    }
}
