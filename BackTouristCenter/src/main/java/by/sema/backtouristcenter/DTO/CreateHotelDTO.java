package by.sema.backtouristcenter.DTO;

import lombok.Data;

@Data
public class CreateHotelDTO {

    private String name;
    private String location;
    private Double price_per_night;

}
