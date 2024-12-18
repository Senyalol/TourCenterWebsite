package by.sema.backtouristcenter.repositorises;

import by.sema.backtouristcenter.Entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    Booking findBookingsById(Integer id);

}