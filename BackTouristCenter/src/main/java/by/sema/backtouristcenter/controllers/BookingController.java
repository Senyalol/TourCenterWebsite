package by.sema.backtouristcenter.controllers;

import by.sema.backtouristcenter.DTO.CreateBookingDTO;
import by.sema.backtouristcenter.DTO.ShortBookingInfoDTO;
import by.sema.backtouristcenter.Entities.Booking;
import by.sema.backtouristcenter.servises.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.NoSuchElementException;
import org.springframework.dao.DataIntegrityViolationException;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(final BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public Iterable<ShortBookingInfoDTO> getAllBookings() {
        return bookingService.getBookings();
    }

    @GetMapping("/{id}")
    public ShortBookingInfoDTO getBookingById(@PathVariable int id) {
        return bookingService.getBookingById(id);
    }

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody CreateBookingDTO createBookingDTO) {
        try {
            if (createBookingDTO.getCount() <= 0) {
                return ResponseEntity.badRequest().body("Count must be greater than zero.");
            }
            if (createBookingDTO.getBookingDate() == null) {
                return ResponseEntity.badRequest().body("Booking date must not be null.");
            }

            bookingService.createBooking(createBookingDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Booking created successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Data integrity violation: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Логирование
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}