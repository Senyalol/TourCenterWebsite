package by.sema.backtouristcenter.repositorises;

import by.sema.backtouristcenter.Entities.Tour;
import by.sema.backtouristcenter.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends JpaRepository<Tour, Integer> {
        
    Tour findByTourname(String tourName);


}
