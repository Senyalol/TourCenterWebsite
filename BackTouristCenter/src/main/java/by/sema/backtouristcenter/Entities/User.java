package by.sema.backtouristcenter.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Users_id_gen")
    @SequenceGenerator(name = "Users_id_gen", sequenceName = "Users_id_seq", allocationSize = 1)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "username", length = Integer.MAX_VALUE)
    private String username;

    @Column(name = "password", length = Integer.MAX_VALUE)
    private String password;

    @Column(name = "email", length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "administrator")
    private Boolean administrator;

    @Column(name = "imagep")
    private String imagep;

}