package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.FavoriteHome;

import java.util.List;

public interface FavoriteHomeService {
    public List<FavoriteHome> getFavoriteHomes(int user_id);
    public FavoriteHome addFavoriteHome(int user_id, String user_type, int listing_id);
    public Boolean deleteFavoriteHome(int user_id, int listing_id);
}
