package by.sema.backtouristcenter.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Bookings_id_gen")
    @SequenceGenerator(name = "Bookings_id_gen", sequenceName = "Hotels_booking_id_seq", allocationSize = 1)
    @Column(name = "booking_id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @NotNull
    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @Column(name = "status", length = Integer.MAX_VALUE)
    private String status;

    @NotNull
    @Column(name = "count",nullable = false)
    private Integer count;

}