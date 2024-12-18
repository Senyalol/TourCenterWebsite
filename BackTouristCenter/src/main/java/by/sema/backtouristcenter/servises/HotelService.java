package by.sema.backtouristcenter.servises;

import by.sema.backtouristcenter.Entities.Hotel;
import by.sema.backtouristcenter.DTO.CreateHotelDTO;
import by.sema.backtouristcenter.DTO.UpdateHotelDTO;
import by.sema.backtouristcenter.DTO.ShortHotelInfoDTO;
import by.sema.backtouristcenter.repositorises.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class HotelService {

    private final HotelRepository hotelRepository;

    @Autowired
    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public Iterable<ShortHotelInfoDTO> getHotels() {

        List<Hotel> hotels = hotelRepository.findAll();

        return hotels.stream()
                .map(hotel -> {
            ShortHotelInfoDTO hotelDTO = new ShortHotelInfoDTO();
            hotelDTO.setId(hotel.getId());
            hotelDTO.setName(hotel.getName());
            hotelDTO.setLocation(hotel.getLocation());
            hotelDTO.setRating(hotel.getRating());
            hotelDTO.setPrice_per_night(hotel.getPricePerNight());
            hotelDTO.setImagepath(hotel.getImagepath());
            return hotelDTO;

        }).toList();

    }

    public Hotel getHotelById(int id) {
        return hotelRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Hotel not found"));
    }

    public void createHotel(CreateHotelDTO createHotelDTO) {
        Hotel hotel = new Hotel();
        hotel.setName(createHotelDTO.getName());
        hotel.setLocation(createHotelDTO.getLocation());
        hotel.setPricePerNight(createHotelDTO.getPrice_per_night());

        hotelRepository.save(hotel);

    }

    public void updateHotel(int id) {
        Hotel hotelToUpdate = getHotelById(id);
    }

    public void deleteHotel(int id) {
        hotelRepository.delete(getHotelById(id));
    }

    private Hotel convertDTOToHotel(UpdateHotelDTO updateHotel, Hotel hotel) {

        hotel.setName(updateHotel.getName());
        hotel.setLocation(updateHotel.getLocation());
        hotel.setRating(updateHotel.getRating());
        hotel.setPricePerNight(updateHotel.getPrice_per_night());
        hotel.setId(updateHotel.getHotel_id());

        return hotel;
    }

}
