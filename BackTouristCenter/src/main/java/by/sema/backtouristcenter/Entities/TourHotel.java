package by.sema.backtouristcenter.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tour_hotels")
public class TourHotel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Tour_Hotels_id_gen")
    @SequenceGenerator(name = "Tour_Hotels_id_gen", sequenceName = "Tour_Hotels_tour_hotel_id_seq", allocationSize = 1)
    @Column(name = "tour_hotel_id", nullable = false)
    private Integer tourHotelId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;
}