package com.cmpe202.teamtrendz.homefinder.model;

public class Listing {
    private Integer id;
    private String title;
    private String description;
    private Integer security_deposit;
    private String building_number;
    private String apartment;
    private String street_name;
    private String city;
    private String state;
    private String zip_code;
    private String country;
    private Integer listing_price;
    private Integer distance;
    private Integer listing_status;
    private Integer listing_type;
    private Integer listing_user;
    private Integer listing_views;
    private Boolean is_furnished;
    private Integer square_footage;
    private Integer num_baths;
    private Integer num_beds;
    private Integer num_parking_spots;
    private Boolean pet_policy;
    private Boolean smoking_policy;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSecurityDeposit() {
        return security_deposit;
    }

    public void setSecurityDeposit(int security_deposit) {
        this.security_deposit = security_deposit;
    }

    public String getBuildingNum() {
        return building_number;
    }

    public void setBuildingNum(String building_number) {
        this.building_number = building_number;
    }

    public String getApartment() {
        return apartment;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }

    public String getStreetName() {
        return street_name;
    }

    public void setStreetName(String streetName) {
        this.street_name = streetName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zip_code;
    }

    public void setZipCode(String zipCode) {
        this.zip_code = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPrice() {
        return listing_price;
    }

    public void setPrice(int price) {
        this.listing_price = price;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public int getListingStatus() {
        return listing_status;
    }

    public void setListingStatus(int listingStatus) {
        this.listing_status = listingStatus;
    }

    public int getListingType() {
        return listing_type;
    }

    public void setListingType(int listingType) {
        this.listing_type = listingType;
    }

    public int getListingUser() {
        return listing_user;
    }

    public void setListingUser(int listingUser) {
        this.listing_user = listingUser;
    }

    public int getListingView() {
        return listing_views;
    }

    public void setListingView(int listingView) {
        this.listing_views = listingView;
    }

    public boolean isFurnished() {
        return is_furnished;
    }

    public void setFurnished(boolean furnished) {
        is_furnished = furnished;
    }

    public int getSquareFeet() {
        return square_footage;
    }

    public void setSquareFeet(int squareFeet) {
        this.square_footage = squareFeet;
    }

    public int getNumBaths() {
        return num_baths;
    }

    public void setNumBaths(int numBaths) {
        this.num_baths = numBaths;
    }

    public int getNumBeds() {
        return num_beds;
    }

    public void setNumBeds(int numBeds) {
        this.num_beds = numBeds;
    }

    public int getNumParkingSpots() {
        return num_parking_spots;
    }

    public void setNumParkingSpots(int numParkingSpots) {
        this.num_parking_spots = numParkingSpots;
    }

    public boolean isPetPolicy() {
        return pet_policy;
    }

    public void setPetPolicy(boolean petPolicy) {
        this.pet_policy = petPolicy;
    }

    public boolean isSmokingPolicy() {
        return smoking_policy;
    }

    public void setSmokingPolicy(boolean smokingPolicy) {
        this.smoking_policy = smokingPolicy;
    }
}
