package by.sema.backtouristcenter.servises;

import by.sema.backtouristcenter.DTO.*;
import by.sema.backtouristcenter.repositorises.TourRepository;
import by.sema.backtouristcenter.Entities.Tour;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class TourService {

    private final TourRepository tourRepository;

    @Autowired
    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public Iterable<ShortTourInfoDTO> getTours() {

        List<Tour> tours = tourRepository.findAll();

        return tours.stream()
                .map(tour -> {
                    ShortTourInfoDTO tourDTO = new ShortTourInfoDTO();
                    tourDTO.setId(tour.getId());
                    tourDTO.setTourname(tour.getTourname());
                    tourDTO.setStart_date(tour.getStartDate());
                    tourDTO.setEnd_date(tour.getEndDate());
                    tourDTO.setPrice(tour.getPrice());
                    tourDTO.setDescription(tour.getDescription());
                    tourDTO.setWhere_from(tour.getWhereFrom());
                    tourDTO.setDestination(tour.getDestination());
                    tourDTO.setImagep(tour.getImagep());

                    return tourDTO;
                }).toList();

    }

    public Tour getTourById(int id) {
        return tourRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    public void createTour(CreateTourDTO createTourDTO) {
        Tour tour = new Tour();

        tour.setTourname(createTourDTO.getTourname());
        tour.setStartDate(createTourDTO.getStart_date());
        tour.setEndDate(createTourDTO.getEnd_date());
        tour.setPrice(createTourDTO.getPrice());
        tour.setDescription(createTourDTO.getDescription());
        tour.setWhereFrom(createTourDTO.getWhere_from());
        tour.setDestination(createTourDTO.getDestination());
        tourRepository.save(tour);


    }

    public void updateTour(int id , UpdateTourDTO updateTourDTO) {
        Tour tourToUpdate = getTourById(id);

    }

    public void deleteTour(int id) {
        tourRepository.delete(getTourById(id));
    }

    private Tour convertDTOToTour(UpdateTourDTO updateTourDTO,Tour tour) {
        tour.setTourname(updateTourDTO.getTourname());
        tour.setStartDate(updateTourDTO.getStart_date());
        tour.setEndDate(updateTourDTO.getEnd_date());
        tour.setPrice(updateTourDTO.getPrice());
        tour.setDescription(updateTourDTO.getDescription());
        tour.setWhereFrom(updateTourDTO.getWhere_from());
        tour.setDestination(updateTourDTO.getDestination());
        tour.setId(updateTourDTO.getTour_id());

        return tour;
    }

}
