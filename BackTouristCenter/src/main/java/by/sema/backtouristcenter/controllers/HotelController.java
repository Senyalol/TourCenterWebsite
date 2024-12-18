package by.sema.backtouristcenter.controllers;

import by.sema.backtouristcenter.DTO.CreateHotelDTO;
import by.sema.backtouristcenter.DTO.ShortHotelInfoDTO;
import by.sema.backtouristcenter.Entities.Hotel;
import by.sema.backtouristcenter.servises.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    //Конструктор контроллера
    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public Iterable<ShortHotelInfoDTO> getAllHotels() {
        return hotelService.getHotels();
    }

    @GetMapping("/{id}")
    public Hotel getHotelById(@PathVariable int id) {
        return hotelService.getHotelById(id);
    }

    public void createHotel(@RequestBody CreateHotelDTO createHotelDTO) {
        hotelService.createHotel(createHotelDTO);
    }

}
