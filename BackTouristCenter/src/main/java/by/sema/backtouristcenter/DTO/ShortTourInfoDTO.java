package by.sema.backtouristcenter.DTO;

import java.time.LocalDate;
import lombok.Data;

@Data
public class ShortTourInfoDTO {

    private Integer id;
    private String tourname;
    private String where_from;
    private String destination;
    private LocalDate start_date;
    private LocalDate end_date;
    private String description;
    private Double price;
    private String imagep;

}
