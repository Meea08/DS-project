package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.entities.User;
import ro.tuc.ds2020.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private static final Logger         LOGGER = LoggerFactory.getLogger(UserService.class);
    private final        UserRepository userRepository;

    @Autowired
    public UserService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> findUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(UserBuilder::toUserDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> findAdmin() {
        List<User> userList = userRepository.findAll();
        List<User> adminList = userList.stream()
                .filter(user -> "admin".equals(user.getRole()))
                .collect(Collectors.toList());

        return adminList.stream()
                .map(UserBuilder::toUserDTO)
                .collect(Collectors.toList());

    }

    public UserDTO findUserById(UUID id) {
        Optional<User> prosumerOptional = userRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + id);
        }
        return UserBuilder.toUserDTO(prosumerOptional.get());
    }



    public UserDTO findByUsername(String username){
        Optional<User> prosumerOptional = userRepository.findByUsername (username);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with username {} was not found in db", username);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with username: " + username);
        }
        return UserBuilder.toUserDTO(prosumerOptional.get());
    }

    public UserDTO findByUsername2(String username){
        Optional<User> prosumerOptional = userRepository.findByUsername (username);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with username {} was not found in db", username);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with username: " + username);
        }
        return UserBuilder.toUserDTO(prosumerOptional.get());
    }


//    public UserDTO findUserByUsername(String username){
//        Optional<User> prosumerOptional = userRepository.findByUsername(username);
//        if (!prosumerOptional.isPresent()) {
//            LOGGER.error("User with username {} was not found in db", username);
//            throw new ResourceNotFoundException(User.class.getSimpleName() + " with username: " + username);
//        }
//        return UserBuilder.toUserDTO(prosumerOptional.get());
//    }

    public UUID insert(UserDTO userDTO) {
        User user = UserBuilder.toEntity(userDTO);
        user = userRepository.save(user);
        LOGGER.debug("User with id {} was inserted in db", user.getId());
        return user.getId();
    }

    // update the user with the given id
    public UUID update(UUID userId, UserDTO userDTO) {
        User user = UserBuilder.toEntity(userDTO);
        user.setId(userId);
        user = userRepository.save(user);
        LOGGER.debug("User with id {} was updated in db", user.getId());
        return user.getId();
    }

    // delete the user with the given id
    public UUID delete(UUID userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            LOGGER.error("User with id {} was not found in db", userId);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + userId);
        }
        userRepository.deleteById(userId);
        LOGGER.debug("User with id {} was deleted from db", userId);
        return userId;
    }

}
