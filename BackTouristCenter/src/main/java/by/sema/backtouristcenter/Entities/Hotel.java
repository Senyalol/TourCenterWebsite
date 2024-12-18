package by.sema.backtouristcenter.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Hotels_id_gen")
    @SequenceGenerator(name = "Hotels_id_gen", sequenceName = "Hotels_hotel_id_seq", allocationSize = 1)
    @Column(name = "hotel_id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @NotNull
    @Column(name = "location", nullable = false, length = Integer.MAX_VALUE)
    private String location;

    @NotNull
    @Column(name = "rating", nullable = false)
    private Double rating;

    @NotNull
    @Column(name = "price_per_night", nullable = false)
    private Double pricePerNight;

    @Column(name = "imagepath")
    private String imagepath;
}