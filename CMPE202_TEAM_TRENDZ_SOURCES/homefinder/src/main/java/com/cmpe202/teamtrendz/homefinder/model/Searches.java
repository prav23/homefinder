package com.cmpe202.teamtrendz.homefinder.model;

public class Searches {
    private int user_id;
    private int security_deposit;
    private int min_price;
    private int max_price;
    private int listing_type;
    private boolean is_furnished;
    private int min_sf;
    private int max_sf;
    private int num_baths;
    private int num_beds;
    private int num_parking_spots;
    private boolean pet_policy;
    private boolean smoking_policy;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getSecurity_deposit() {
        return security_deposit;
    }

    public void setSecurity_deposit(int security_deposit) {
        this.security_deposit = security_deposit;
    }

    public int getMin_price() {
        return min_price;
    }

    public void setMin_price(int min_price) {
        this.min_price = min_price;
    }

    public int getMax_price() {
        return max_price;
    }

    public void setMax_price(int max_price) {
        this.max_price = max_price;
    }

    public int getListing_type() {
        return listing_type;
    }

    public void setListing_type(int listing_type) {
        this.listing_type = listing_type;
    }

    public boolean isIs_furnished() {
        return is_furnished;
    }

    public void setIs_furnished(boolean is_furnished) {
        this.is_furnished = is_furnished;
    }

    public int getMin_sf() {
        return min_sf;
    }

    public void setMin_sf(int min_sf) {
        this.min_sf = min_sf;
    }

    public int getMax_sf() {
        return max_sf;
    }

    public void setMax_sf(int max_sf) {
        this.max_sf = max_sf;
    }

    public int getNum_baths() {
        return num_baths;
    }

    public void setNum_baths(int num_baths) {
        this.num_baths = num_baths;
    }

    public int getNum_beds() {
        return num_beds;
    }

    public void setNum_beds(int num_beds) {
        this.num_beds = num_beds;
    }

    public int getNum_parking_spots() {
        return num_parking_spots;
    }

    public void setNum_parking_spots(int num_parking_spots) {
        this.num_parking_spots = num_parking_spots;
    }

    public boolean isPet_policy() {
        return pet_policy;
    }

    public void setPet_policy(boolean pet_policy) {
        this.pet_policy = pet_policy;
    }

    public boolean isSmoking_policy() {
        return smoking_policy;
    }

    public void setSmoking_policy(boolean smoking_policy) {
        this.smoking_policy = smoking_policy;
    }
}
