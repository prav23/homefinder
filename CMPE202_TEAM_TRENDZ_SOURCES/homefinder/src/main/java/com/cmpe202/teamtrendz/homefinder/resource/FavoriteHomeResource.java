package com.cmpe202.teamtrendz.homefinder.resource;

import com.cmpe202.teamtrendz.homefinder.model.FavoriteHome;
import com.cmpe202.teamtrendz.homefinder.service.FavoriteHomeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favoritehomes")
public class FavoriteHomeResource {
    private static final Logger logger = LogManager.getLogger(ListingResource.class);
    private FavoriteHomeService favoriteHomeService;

    @Autowired
    public void setFavoriteHomeService(FavoriteHomeService favoriteHomeService) { this.favoriteHomeService = favoriteHomeService; }

    @GetMapping(path="/getFavoriteHomes")
    @ApiOperation(value = "Returns all favorite homes of user",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = FavoriteHome.class)
    public List<FavoriteHome> getFavoriteHomes(@ApiParam (value= "user_id", required = true) @RequestParam int user_id){
        logger.info("FavoriteHomeResource::getFavoriteHomes");
        return favoriteHomeService.getFavoriteHomes(user_id);
    }

    @PostMapping(path="/addFavoriteHome")
    @ApiOperation(value = "Inserts Favorite Home object into favorite_homes table",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = FavoriteHome.class)
    public FavoriteHome addFavoriteHome(@ApiParam (value= "user_id", required = true) @RequestParam int user_id,
                                        @ApiParam (value = "user_type", required = true) @RequestParam String user_type,
                                        @ApiParam (value = "listing_id", required = true) @RequestParam int listing_id){
        logger.info("FavoriteHomeResource::addFavoriteHome with user_id, user_type, listing_id: " + user_id + ", " + user_type + ", " + listing_id);
        return favoriteHomeService.addFavoriteHome(user_id, user_type, listing_id);
    }

    @PostMapping(path="/deleteFavoriteHome")
    @ApiOperation(value = "Delete the specified favorite home object from the favorite_homes table")
    public Boolean deleteFavoriteHome(@ApiParam (value= "user_id", required = true) @RequestParam int user_id,
                                      @ApiParam (value= "listing_id", required = true) @RequestParam int listing_id){
        logger.info("FavoriteHomeResource::deleteFavoriteHome");
        return favoriteHomeService.deleteFavoriteHome(user_id, listing_id);
    }

}
