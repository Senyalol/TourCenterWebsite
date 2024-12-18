package by.sema.backtouristcenter.controllers;

import by.sema.backtouristcenter.servises.UserService;
import by.sema.backtouristcenter.DTO.CreateUserDTO;
import by.sema.backtouristcenter.DTO.ShortUserInfoDTO;
import by.sema.backtouristcenter.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Iterable<ShortUserInfoDTO> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody CreateUserDTO createUserDTO) {
        try {
            userService.createUser(createUserDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Пользователь успешно создан");
        } catch (Exception e) {
            e.printStackTrace(); // Логируем ошибку
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при создании пользователя");
        }
    }

}
