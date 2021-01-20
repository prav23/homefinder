package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.Listing;

import java.util.List;

public interface ListingService {
    List<Listing> getAllListings();
    List<Listing> getListing();
    Listing postListing(String title, String description, Integer security_deposit, String building_number, String apartment, String street_name, String city, String state, String zip_code, String country, Integer listing_price, Integer distance, Integer listing_status, Integer listing_type, Integer listing_user, Integer listing_views, Boolean is_furnished, Integer square_footage, Integer num_baths, Integer num_beds, Integer num_parking_spots, Boolean pet_policy, Boolean smoking_policy);
    Listing updateListing(Integer id, String title, String description, Integer security_deposit, String building_number, String apartment, String street_name, String city, String state, String zip_code, String country, Integer listing_price, Integer distance, Integer listing_status, Integer listing_type, Integer listing_user, Integer listing_views, Boolean is_furnished, Integer square_footage, Integer num_baths, Integer num_beds, Integer num_parking_spots, Boolean pet_policy, Boolean smoking_policy);
    Boolean deleteListing(Integer id);

}
