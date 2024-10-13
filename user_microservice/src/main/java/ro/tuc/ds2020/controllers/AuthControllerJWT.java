package ro.tuc.ds2020.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.jwt.JwtUtil;
import ro.tuc.ds2020.request.AuthRequest;
import ro.tuc.ds2020.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping( "/auth")
@CrossOrigin("http://localhost:3000")
public class AuthControllerJWT {

    private final JwtUtil jwtUtil;

    @Autowired
    public AuthControllerJWT(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Autowired
    UserService userService;

    @PostMapping("/1/authenticate")
    public String createToken(@RequestBody AuthRequest authRequest){

        UserDTO userDTO = userService.findByUsername2 (authRequest.getUsername ());
        System.out.println(userDTO.getName ());
        if(userDTO.getPassword().equals(authRequest.getPassword())){
            List<String> userRoles = new ArrayList<>();
            if(Objects.equals (userDTO.getRole (), "admin")){
                userRoles.add("admin");
            }
            else {
                userRoles.add("client");
            }
            String jwt = jwtUtil.generateToken(authRequest.getUsername (), userRoles);
            System.out.println (jwtUtil);
            return jwt;

        }
        throw new RuntimeException("bad credentials");
    }

    @PostMapping("/getEmail")
    public ResponseEntity<String> getEmail(@RequestBody String token){
        return new ResponseEntity<>( jwtUtil.extractUsername(token), HttpStatus.OK);
    }

    @PostMapping("/getRole")
    public ResponseEntity<String> getRole(@RequestBody String token){
        System.out.println (token);
        String userEmail = jwtUtil.extractUsername(token);
        UserDTO userDTO = userService.findByUsername2 (userEmail);
        System.out.println("token: " + token);
        System.out.println("user: " + userDTO.getId());
        System.out.println("role: " + userDTO.getRole());

        return new ResponseEntity<>( userDTO.getRole(), HttpStatus.OK);
    }

    @PostMapping("/getId")
    public ResponseEntity<String> getId(@RequestBody String token){
        String userEmail = jwtUtil.extractUsername(token);
        UserDTO userDTO = userService.findByUsername2 (userEmail);
        return new ResponseEntity<>( userDTO.getId().toString(), HttpStatus.OK);
    }
}
