package com.cmpe202.teamtrendz.homefinder.service;

import com.cmpe202.teamtrendz.homefinder.model.Application;

import java.util.List;

public interface ApplicationService {
    public List<Application> viewBuyersApplications(int seller_id);
    public Application manageBuyersApplications(int listing_id, int buyer_id, String newStatus);
    public List<Application> getMyApplications(int buyerId);
    public Application submitApplication(String date, int listing_id, int buyer_id, int seller_id, String app_type, String status, Integer price);
}
