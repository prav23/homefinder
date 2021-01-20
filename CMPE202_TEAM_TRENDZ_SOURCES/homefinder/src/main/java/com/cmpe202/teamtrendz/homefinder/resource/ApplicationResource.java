package com.cmpe202.teamtrendz.homefinder.resource;

import com.cmpe202.teamtrendz.homefinder.model.Application;
import com.cmpe202.teamtrendz.homefinder.service.ApplicationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application")
public class ApplicationResource {
    private static final Logger logger = LogManager.getLogger(ListingResource.class);
    private ApplicationService applicationService;

    @Autowired
    public void setApplicationService(ApplicationService applicationService){ this.applicationService = applicationService;}

    @GetMapping("/viewBuyersApplications")
    @ApiOperation(value = "Returns Buyers' Applications",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Application.class)
    public List<Application> viewBuyersApplications(@ApiParam(value = "seller_id", required = true) @RequestParam int seller_id){
        logger.info("ApplicationResource::viewBuyersApplications");
        return applicationService.viewBuyersApplications(seller_id);
    }

    @PostMapping("/manageBuyersApplication")
    @ApiOperation(value = "Update Buyers' Applications",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Application.class)
    public Application manageBuyersApplication(@ApiParam(value = "listing_id", required = true) @RequestParam int listing_id,
                                               @ApiParam (value = "buyer_id", required = true) @RequestParam  int buyer_id,
                                               @ApiParam (value = "newStatus", required = true) @RequestParam String newStatus){
        logger.info("ApplicationResource::manageBuyersApplication");
        return applicationService.manageBuyersApplications(listing_id, buyer_id, newStatus);
    }

    @GetMapping("/getMyApplications")
    @ApiOperation(value = "Returns Applications",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Application.class)
    public List<Application> getMyApplications(@ApiParam(value = "buyer_id", required = true) @RequestParam int buyer_id){
        logger.info("ApplicationResource::getMyApplications");
        return applicationService.getMyApplications(buyer_id);
    }

    @PostMapping("/submitApplication")
    @ApiOperation(value = "Posts Applications",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            response = Application.class)
    public Application submitApplication(@ApiParam (value = "app_date", required = true) @RequestParam String app_date,
                                         @ApiParam (value = "listing_id", required = true) @RequestParam int listing_id,
                                         @ApiParam (value = "buyer_id", required = true) @RequestParam int buyer_id,
                                         @ApiParam (value = "seller_id", required = true) @RequestParam int seller_id,
                                         @ApiParam (value = "app_type", required = true) @RequestParam String app_type,
                                         @ApiParam (value = "status", required = true) @RequestParam String status,
                                         @ApiParam (value = "price", required = true) @RequestParam Integer price){
        logger.info("ApplicationResource::submitApplications");
        return applicationService.submitApplication(app_date, listing_id, buyer_id, seller_id, app_type, status, price);
    }
}
