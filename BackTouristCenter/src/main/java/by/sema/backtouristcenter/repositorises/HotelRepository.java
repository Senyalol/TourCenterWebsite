package by.sema.backtouristcenter.repositorises;

import by.sema.backtouristcenter.Entities.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {

    Hotel findByName(String name);

}
