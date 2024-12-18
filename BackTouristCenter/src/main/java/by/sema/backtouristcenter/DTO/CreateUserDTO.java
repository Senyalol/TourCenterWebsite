package by.sema.backtouristcenter.DTO;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class CreateUserDTO {

    private String username;
    private String password;
    private String email;
    private Boolean administrator;
    private String imagep;

}
