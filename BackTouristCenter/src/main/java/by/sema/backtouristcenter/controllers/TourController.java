package by.sema.backtouristcenter.controllers;


import by.sema.backtouristcenter.servises.TourService;
import by.sema.backtouristcenter.Entities.Tour;
import by.sema.backtouristcenter.DTO.ShortTourInfoDTO;
import by.sema.backtouristcenter.DTO.CreateTourDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;

    @Autowired
    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @GetMapping
    public Iterable<ShortTourInfoDTO> getAllTours() {
        return tourService.getTours();
    }

    @GetMapping("/{id}")
    public Tour getTourById(@PathVariable int id) {
        return tourService.getTourById(id);
    }

    @PostMapping
    public void createTour(@RequestBody CreateTourDTO createTourDTO) {
        tourService.createTour(createTourDTO);
    }

}
