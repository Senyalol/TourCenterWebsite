package by.sema.backtouristcenter.servises;

import by.sema.backtouristcenter.DTO.*;
import by.sema.backtouristcenter.repositorises.HotelRepository;
import by.sema.backtouristcenter.repositorises.TourRepository;
import by.sema.backtouristcenter.Entities.Hotel;
import by.sema.backtouristcenter.Entities.TourHotel;
import by.sema.backtouristcenter.repositorises.TourHotRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import by.sema.backtouristcenter.Entities.Tour;

import java.util.List;
import java.util.NoSuchElementException;
@Service
@Transactional
public class TourHotService {


    private final TourHotRepository tourHotRepository;
    private final TourRepository tourRepository;
    private final HotelRepository hotelRepository;

    @Autowired
    public TourHotService(TourRepository tourRepository, TourHotRepository tourHotelRepository, HotelRepository hotelRepository) {
        this.tourRepository = tourRepository;
        this.tourHotRepository = tourHotelRepository;
        this.hotelRepository = hotelRepository;
    }

    public Iterable<ShortTourHotelInfoDTO> getTourHotels() {
        List<TourHotel> tourHotels = tourHotRepository.findAll();
        return tourHotels.stream()
                .map(tourHotel -> {
                    ShortTourHotelInfoDTO dto = new ShortTourHotelInfoDTO();
                    dto.setTourHotelId(tourHotel.getTourHotelId());
                    dto.setTour_id(tourHotel.getTour().getId());
                    dto.setHotel_id(tourHotel.getHotel().getId());
                    return dto;
                }).toList();
    }

    public ShortTourHotelInfoDTO getTourHotById(int id) {
        TourHotel tourHotel = tourHotRepository.findById(id);
        ShortTourHotelInfoDTO dto = new ShortTourHotelInfoDTO();
        dto.setTourHotelId(tourHotel.getTourHotelId());
        dto.setTour_id(tourHotel.getTour().getId());
        dto.setHotel_id(tourHotel.getHotel().getId());
        return dto;
    }

    public void createTourHot(CreateTourHotelsDTO createTourHotel) {
        Tour tour = tourRepository.findById(createTourHotel.getTour_id())
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + createTourHotel.getTour_id()));
        Hotel hotel = hotelRepository.findById(createTourHotel.getHotel_id())
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + createTourHotel.getHotel_id()));
        TourHotel tourHot = new TourHotel();
        tourHot.setTour(tour);
        tourHot.setHotel(hotel);
        tourHotRepository.save(tourHot);
    }

    public void updateTourHot(int id, UpdateTourHotelInfoDTO updateTourHot) {
        TourHotel tourHotToUpdate = tourHotRepository.findById(id);

        convertDTOToTourHot(updateTourHot, tourHotToUpdate);
        tourHotRepository.save(tourHotToUpdate);
    }

    public void deleteTourHot(int id) {
        if (!tourHotRepository.existsById(id)) {
            throw new NoSuchElementException("TourHotel not found with ID: " + id);
        }
        tourHotRepository.deleteById(id);
    }

    private void convertDTOToTourHot(UpdateTourHotelInfoDTO updateTourHot, TourHotel tourHotel) {
        Tour tour = tourRepository.findById(updateTourHot.getTour_id()) // Используем getTourId()
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + updateTourHot.getTour_id()));

        Hotel hotel = hotelRepository.findById(updateTourHot.getHotel_id()) // Используем getHotelId()
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + updateTourHot.getHotel_id()));

        tourHotel.setTour(tour);
        tourHotel.setHotel(hotel);
    }
}
