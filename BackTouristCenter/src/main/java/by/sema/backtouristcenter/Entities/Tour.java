package by.sema.backtouristcenter.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tours")
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Tours_id_gen")
    @SequenceGenerator(name = "Tours_id_gen", sequenceName = "Tours_id_seq", allocationSize = 1)
    @Column(name = "tour_id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "destination", nullable = false, length = Integer.MAX_VALUE)
    private String destination;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "tourname", length = Integer.MAX_VALUE)
    private String tourname;

    @Column(name = "where_from", length = Integer.MAX_VALUE)
    private String whereFrom;

    @Column(name = "imagep")
    private String imagep;

}