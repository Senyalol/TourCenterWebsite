package by.sema.backtouristcenter.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateTourDTO {

    private String tourname;
    private String where_from;
    private String destination;
    private LocalDate start_date;
    private LocalDate end_date;
    private String description;
    private Double price;

}
