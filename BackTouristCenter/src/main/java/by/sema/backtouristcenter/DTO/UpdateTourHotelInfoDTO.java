package by.sema.backtouristcenter.DTO;

import lombok.Data;

@Data
public class UpdateTourHotelInfoDTO {
    private Integer tourHotelId; // Переименовано в tourHotelId
    private Integer tour_id;      // Переименовано в tourId
    private Integer hotel_id;     // Переименовано в hotelId
}