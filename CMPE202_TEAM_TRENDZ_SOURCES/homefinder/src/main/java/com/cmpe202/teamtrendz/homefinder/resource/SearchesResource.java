package com.cmpe202.teamtrendz.homefinder.resource;

import com.cmpe202.teamtrendz.homefinder.model.Searches;
import com.cmpe202.teamtrendz.homefinder.service.SearchesService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/searches")
public class SearchesResource {
    private static final Logger logger = LogManager.getLogger(ListingResource.class);
    private SearchesService searchesService;

    @Autowired
    public void setSearchesService(SearchesService searchesService) { this.searchesService = searchesService; }

    @GetMapping(path="/getMySearch")
    public List<Searches> getMySearch(@ApiParam (value="user_id", required = true) @RequestParam int user_id){
        logger.info("SearchesResource::getMySearch");
        return searchesService.getMySearch(user_id);
    }

    @PostMapping(path="/addMySearch")
    @ApiOperation(value = "Inserts Searches object into searches table",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Searches.class)
    public Searches addMySearch(@ApiParam (value="user_id", required = true) @RequestParam int user_id,
                                @ApiParam(value = "security_deposit", required = true) @RequestParam int security_deposit,
                                @ApiParam (value="min_price", required = true) @RequestParam int min_price,
                                @ApiParam (value="max_price", required = true) @RequestParam int max_price,
                                @ApiParam (value="listing_type", required = true) @RequestParam int listing_type,
                                @ApiParam (value="is_furnished", required = true) @RequestParam boolean is_furnished,
                                @ApiParam (value="min_sf", required = true) @RequestParam int min_sf,
                                @ApiParam (value="max_sf", required = true) @RequestParam int max_sf,
                                @ApiParam (value="num_baths", required = true) @RequestParam int num_baths,
                                @ApiParam (value="num_beds", required = true) @RequestParam int num_beds,
                                @ApiParam (value="num_parking_spots", required = true) @RequestParam int num_parking_spots,
                                @ApiParam (value="pet_policy", required = true) @RequestParam boolean pet_policy,
                                @ApiParam (value="smoking_policy", required = true) @RequestParam boolean smoking_policy){
        logger.info("SearchesResource::addMySearch with user_id, listing_type: " + user_id + ", " + listing_type);
        return searchesService.addMySearch(user_id, security_deposit, min_price, max_price, listing_type, is_furnished, min_sf, max_sf, num_baths, num_beds, num_parking_spots, pet_policy, smoking_policy);
    }
}
