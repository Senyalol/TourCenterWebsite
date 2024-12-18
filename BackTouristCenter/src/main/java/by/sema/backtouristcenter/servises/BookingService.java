package by.sema.backtouristcenter.servises;

import by.sema.backtouristcenter.Entities.Booking;
import by.sema.backtouristcenter.DTO.ShortBookingInfoDTO;
import by.sema.backtouristcenter.DTO.UpdateBookingDTO;
import by.sema.backtouristcenter.DTO.CreateBookingDTO;
import by.sema.backtouristcenter.repositorises.BookingRepository;
import by.sema.backtouristcenter.repositorises.UserRepository;
import by.sema.backtouristcenter.repositorises.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, TourRepository tourRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.tourRepository = tourRepository;
    }

    public Iterable<ShortBookingInfoDTO> getBookings() {
        List<Booking> bookings = bookingRepository.findAll();

        return bookings.stream()
                .map(booking -> {
                    ShortBookingInfoDTO bookingDTO = new ShortBookingInfoDTO();
                    bookingDTO.setId(booking.getId());
                    bookingDTO.setUserId(booking.getUser().getId());
                    bookingDTO.setTourId(booking.getTour().getId());
                    bookingDTO.setBookingDate(booking.getBookingDate());
                    bookingDTO.setStatus(booking.getStatus());
                    bookingDTO.setCount(booking.getCount());
                    return bookingDTO;
                }).toList();
    }

    public ShortBookingInfoDTO getBookingById(int id) {
        Booking booking = bookingRepository.findById(id).orElseThrow(NoSuchElementException::new);
        ShortBookingInfoDTO bookingDTO = new ShortBookingInfoDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setUserId(booking.getUser().getId());
        bookingDTO.setTourId(booking.getTour().getId());
        bookingDTO.setBookingDate(booking.getBookingDate());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setCount(booking.getCount());
        return bookingDTO;
    }

    public void createBooking(CreateBookingDTO createBookingDTO) {
        // Проверка, что дата бронирования не равна null
        if (createBookingDTO.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking date must not be null");
        }

        Booking booking = new Booking();

        // Получаем пользователя по ID
        var user = userRepository.findById(createBookingDTO.getUserId())
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + createBookingDTO.getUserId()));
        booking.setUser(user);

        // Получаем тур по ID
        var tour = tourRepository.findById(createBookingDTO.getTourId())
                .orElseThrow(() -> new NoSuchElementException("Tour not found with ID: " + createBookingDTO.getTourId()));
        booking.setTour(tour);

        // Устанавливаем остальные поля
        booking.setBookingDate(createBookingDTO.getBookingDate());
        booking.setStatus(createBookingDTO.getStatus());
        booking.setCount(createBookingDTO.getCount());

        // Сохраняем объект в базе данных
        bookingRepository.save(booking);
    }

    public void updateBooking(int id, UpdateBookingDTO updateBookingDTO) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Booking not found with ID: " + id));

        convertDTOToBooking(updateBookingDTO, booking);
        bookingRepository.save(booking);
    }

    public void deleteBooking(int id) {
        if (!bookingRepository.existsById(id)) {
            throw new NoSuchElementException("Booking not found with ID: " + id);
        }
        bookingRepository.deleteById(id);
    }

    private ShortBookingInfoDTO convertToDTO(Booking booking) {
        ShortBookingInfoDTO bookingDTO = new ShortBookingInfoDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setUserId(booking.getUser().getId());
        bookingDTO.setTourId(booking.getTour().getId());
        bookingDTO.setBookingDate(booking.getBookingDate());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setCount(booking.getCount());
        return bookingDTO;
    }

    private void convertDTOToBooking(UpdateBookingDTO updateBookingDTO, Booking booking) {
        booking.setBookingDate(updateBookingDTO.getBookingDate());
        booking.setStatus(updateBookingDTO.getStatus());
        booking.setCount(updateBookingDTO.getCount());
    }
}