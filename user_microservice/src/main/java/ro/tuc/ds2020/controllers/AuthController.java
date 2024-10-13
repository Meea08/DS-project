package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.services.UserService;

@RestController
@RequestMapping( "/user")
@CrossOrigin("http://localhost:3000")
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest loginRequest) {
        UserDTO user = userService.findByUsername (loginRequest.username);
        if(user!=null){
            if(user.getPassword().equals(loginRequest.password)){
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    static class LoginRequest {
        private String username;
        private String password;

        public String getUsername () {
            return username;
        }

        public void setUsername (String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


}
