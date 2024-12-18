package by.sema.backtouristcenter.servises;

import by.sema.backtouristcenter.DTO.ShortUserInfoDTO;
import by.sema.backtouristcenter.DTO.CreateUserDTO;
import by.sema.backtouristcenter.Entities.User;
import by.sema.backtouristcenter.DTO.UpdateUserDTO;
import by.sema.backtouristcenter.repositorises.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;  

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<ShortUserInfoDTO> getUsers() {

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> {
                    ShortUserInfoDTO userDTO = new ShortUserInfoDTO();
                    userDTO.setId(user.getId());
                    userDTO.setUsername(user.getUsername());
                    userDTO.setPassword(user.getPassword());
                    userDTO.setEmail(user.getEmail());
                    userDTO.setAdministrator(user.getAdministrator());
                    userDTO.setImagep(user.getImagep());
                    return userDTO;
                }).toList();

    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    public void createUser(CreateUserDTO createUserDTO) {
        User user = new User();

        user.setUsername(createUserDTO.getUsername());
        user.setPassword(createUserDTO.getPassword());
        user.setEmail(createUserDTO.getEmail());
        user.setAdministrator(createUserDTO.getAdministrator());
        user.setImagep(createUserDTO.getImagep());

        userRepository.save(user);
    }

    public void updateUser(int id , UpdateUserDTO updateUserDTO) {
            User userToUpdate = getUserById(id);

    }

    public void deleteUser(int id) {
        userRepository.delete(getUserById(id));
    }

    private User convertDTOToUser(UpdateUserDTO updateUserDTO,User user) {
        user.setUsername(updateUserDTO.getUsername());
        user.setPassword(updateUserDTO.getPassword());
        user.setEmail(updateUserDTO.getEmail());
        user.setAdministrator(updateUserDTO.getAdministrator());
        user.setId(updateUserDTO.getUser_id());
        user.setImagep(updateUserDTO.getImagep());

        return user;
    }

}
