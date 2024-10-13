package ro.tuc.ds2020.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.jwt.JwtUtil;
import ro.tuc.ds2020.services.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;
    private final JwtUtil     jwtUtil;

    @Autowired

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping()
//    @PreAuthorize ("hasAuthority('admin')")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> dtos = userService.findUsers();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/viewAdmin")
    public ResponseEntity<List<UserDTO>> getadmin() {
        List<UserDTO> dtos = userService.findAdmin();

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertUser(@Valid @RequestBody UserDTO userDTO) {
        UUID userID = userService.insert(userDTO);
        return new ResponseEntity<>(userID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") UUID userId) {
        UserDTO dto = userService.findUserById(userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping(value= "/role/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("username") String username) {
        UserDTO dto = userService.findByUsername (username);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<UUID> updateUser(@PathVariable("id") UUID userId, @Valid @RequestBody UserDTO userDTO) {
        UUID userID = userService.update(userId, userDTO);
        return new ResponseEntity<>(userID, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<UUID> deleteUser(@PathVariable("id") UUID userId) {
        UUID userID = userService.delete(userId);
        return new ResponseEntity<>(userID, HttpStatus.OK);
    }
}
