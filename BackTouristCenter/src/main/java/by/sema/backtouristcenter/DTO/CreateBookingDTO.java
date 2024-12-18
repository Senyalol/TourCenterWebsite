package by.sema.backtouristcenter.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateBookingDTO {

    private Integer id;    // ID бронирования
    private Integer userId;       // ID пользователя
    private Integer tourId;       // ID тура
    private LocalDate bookingDate; // Дата бронирования
    private String status;        // Статус бронирования
    private Integer count;        // Количество

}
