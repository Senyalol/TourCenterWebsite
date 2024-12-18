package by.sema.backtouristcenter.DTO;

import lombok.Data;

@Data
public class ShortUserInfoDTO {

    private Integer id;
    private String username;
    private String password;
    private String email;
    private Boolean administrator;
    private String imagep;

}

