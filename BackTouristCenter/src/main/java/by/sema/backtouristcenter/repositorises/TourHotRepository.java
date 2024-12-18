package by.sema.backtouristcenter.repositorises;

import  by.sema.backtouristcenter.Entities.TourHotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface TourHotRepository extends  JpaRepository<TourHotel, Integer> {

    TourHotel findById(int id);

}
