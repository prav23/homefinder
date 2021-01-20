package com.cmpe202.teamtrendz.homefinder.resource;

import com.cmpe202.teamtrendz.homefinder.model.Listing;
import com.cmpe202.teamtrendz.homefinder.service.ListingService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/listing")
public class ListingResource {

    private static final Logger logger = LogManager.getLogger(ListingResource.class);
    private ListingService listingService;

    @Autowired
    public void setListingService(ListingService listingService){ this.listingService = listingService;}

    @RequestMapping(path = "/getListings", method= RequestMethod.GET)
    @ApiOperation(value = "Gets All Listings",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Listing.class)
    public List<Listing> getAllListings(){
        logger.info("ListingResource::getListings");
        return listingService.getAllListings();
    }

    @PostMapping("/postListing")
    @ApiOperation(value = "Inserts a listing object into the listing table",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Listing.class)
    public Listing postListing(@ApiParam(value = "title", required = true) @RequestParam String title,
                             @ApiParam(value = "description", required = true) @RequestParam String description,
                             @ApiParam(value = "security_deposit", defaultValue = "null") @RequestParam Integer security_deposit,
                             @ApiParam(value = "building_number", defaultValue = "null") @RequestParam String building_number,
                             @ApiParam(value = "apartment", defaultValue = "null") @RequestParam String apartment,
                             @ApiParam(value = "street_name", required = true) @RequestParam String street_name,
                             @ApiParam(value = "city", defaultValue = "null") @RequestParam String city,
                             @ApiParam(value = "state", defaultValue = "null") @RequestParam String state,
                             @ApiParam(value = "zip_code", defaultValue = "null") @RequestParam String zip_code,
                             @ApiParam(value = "country", defaultValue = "null") @RequestParam String country,
                             @ApiParam(value = "listing_price", required = true) @RequestParam Integer listing_price,
                             @ApiParam(value = "distance", required = true) @RequestParam Integer distance,
                             @ApiParam(value = "listing_status", required = true) @RequestParam Integer listing_status,
                             @ApiParam(value = "listing_type", required = true) @RequestParam Integer listing_type,
                             @ApiParam(value = "listing_user", required = true) @RequestParam Integer listing_user,
                             @ApiParam(value = "listing_views", required = true) @RequestParam Integer listing_views,
                             @ApiParam(value = "is_furnished", defaultValue = "null") @RequestParam Boolean is_furnished,
                             @ApiParam(value = "square_footage", defaultValue = "null") @RequestParam Integer square_footage,
                             @ApiParam(value = "num_baths", required = true) @RequestParam Integer num_baths,
                             @ApiParam(value = "num_beds", required = true) @RequestParam Integer num_beds,
                             @ApiParam(value = "num_parking_spots", defaultValue = "null") @RequestParam Integer num_parking_spots,
                             @ApiParam(value = "pet_policy", defaultValue = "null") @RequestParam Boolean pet_policy,
                             @ApiParam(value = "smoking_policy", defaultValue = "null") @RequestParam Boolean smoking_policy) {

        logger.info("ListingResource::postListing with title, street_name: " + title + ", " + street_name);
        return listingService.postListing(title, description, security_deposit, building_number, apartment,
                street_name, city, state, zip_code, country, listing_price, distance, listing_status,
                listing_type, listing_user, listing_views, is_furnished, square_footage, num_baths,
                num_beds, num_parking_spots, pet_policy, smoking_policy);
    }

    @PostMapping("/updateListing")
    @ApiOperation(value = "Updates the specified listing object in the listing table",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Listing.class)
    public Listing updateListing(@ApiParam(value = "id", required = true) @RequestParam Integer id,
                                 @ApiParam(value = "title", required = true) @RequestParam String title,
                                 @ApiParam(value = "description", required = true) @RequestParam String description,
                                 @ApiParam(value = "security_deposit", defaultValue = "null") @RequestParam Integer security_deposit,
                                 @ApiParam(value = "building_number", defaultValue = "null") @RequestParam String building_number,
                                 @ApiParam(value = "apartment", defaultValue = "null") @RequestParam String apartment,
                                 @ApiParam(value = "street_name", required = true) @RequestParam String street_name,
                                 @ApiParam(value = "city", defaultValue = "null") @RequestParam String city,
                                 @ApiParam(value = "state", defaultValue = "null") @RequestParam String state,
                                 @ApiParam(value = "zip_code", defaultValue = "null") @RequestParam String zip_code,
                                 @ApiParam(value = "country", defaultValue = "null") @RequestParam String country,
                                 @ApiParam(value = "listing_price", required = true) @RequestParam Integer listing_price,
                                 @ApiParam(value = "distance", required = true) @RequestParam Integer distance,
                                 @ApiParam(value = "listing_status", required = true) @RequestParam Integer listing_status,
                                 @ApiParam(value = "listing_type", required = true) @RequestParam Integer listing_type,
                                 @ApiParam(value = "listing_user", required = true) @RequestParam Integer listing_user,
                                 @ApiParam(value = "listing_views", required = true) @RequestParam Integer listing_views,
                                 @ApiParam(value = "is_furnished", defaultValue = "null") @RequestParam Boolean is_furnished,
                                 @ApiParam(value = "square_footage", defaultValue = "null") @RequestParam Integer square_footage,
                                 @ApiParam(value = "num_baths", required = true) @RequestParam Integer num_baths,
                                 @ApiParam(value = "num_beds", required = true) @RequestParam Integer num_beds,
                                 @ApiParam(value = "num_parking_spots", defaultValue = "null") @RequestParam Integer num_parking_spots,
                                 @ApiParam(value = "pet_policy", defaultValue = "null") @RequestParam Boolean pet_policy,
                                 @ApiParam(value = "smoking_policy", defaultValue = "null") @RequestParam Boolean smoking_policy) {

        logger.info("ListingResource::updateListing with id, title: " + id + ", " + title);
        return listingService.updateListing(id, title, description, security_deposit, building_number, apartment,
                street_name, city, state, zip_code, country, listing_price, distance, listing_status,
                listing_type, listing_user, listing_views, is_furnished, square_footage, num_baths,
                num_beds, num_parking_spots, pet_policy, smoking_policy);
    }

    @PostMapping("/deleteListing")
    @ApiOperation(value = "Delete the specified listing object from the listing table")
    public Boolean deleteListing(@ApiParam(value = "id", required = true) @RequestParam Integer id) {
        logger.info("ListingResource::deleteListing with id: " + id);
        return listingService.deleteListing(id);
    }
}

