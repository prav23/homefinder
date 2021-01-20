package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.Searches;

import java.util.List;

public interface SearchesService {
    public Searches addMySearch(int user_id, int security_deposit, int min_price, int max_price,
                                int listing_type, boolean is_furnished, int min_sf, int max_sf,
                                int num_baths, int num_beds, int num_parking_spots, boolean pet_policy,
                                boolean smoking_policy);
    public List<Searches> getMySearch(int user_id);
}
