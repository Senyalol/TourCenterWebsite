package by.sema.backtouristcenter.controllers;

import by.sema.backtouristcenter.DTO.*;
import by.sema.backtouristcenter.Entities.Tour;
import by.sema.backtouristcenter.Entities.TourHotel;
import by.sema.backtouristcenter.servises.TourHotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tour_hotels")
public class Tour_HotelsController {

    private final TourHotService tourHotService;

    @Autowired
    public Tour_HotelsController(TourHotService tourHotService) {
        this.tourHotService = tourHotService;
    }

    @GetMapping
    public Iterable<ShortTourHotelInfoDTO> getAllTourHotels() {
        return tourHotService.getTourHotels();
    }

    @GetMapping("/{id}")
    public ShortTourHotelInfoDTO getTourHotById(@PathVariable int id) {
        return tourHotService.getTourHotById(id);
    }

    @PostMapping
    public void createTourHot(@RequestBody CreateTourHotelsDTO createTourHotel) {
        tourHotService.createTourHot(createTourHotel);
    }

}
