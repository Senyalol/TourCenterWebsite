package by.sema.backtouristcenter.DTO;

import lombok.Data;

@Data
public class UpdateUserDTO {

    private String username;
    private String password;
    private String email;
    private Boolean administrator;
    private Integer user_id;
    private String imagep;

}
