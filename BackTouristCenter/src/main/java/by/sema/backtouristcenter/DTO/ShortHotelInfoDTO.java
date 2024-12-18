package by.sema.backtouristcenter.DTO;

import lombok.Data;

@Data
public class ShortHotelInfoDTO {

    private Integer id;
    private String name;
    private String location;
    private Double rating;
    private Double price_per_night;
    private String imagepath;

}
