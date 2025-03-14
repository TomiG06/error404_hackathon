package error404.hackathon.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import error404.hackathon.dto.RegisterDTO;
import error404.hackathon.services.UserService;
import error404.hackathon.components.UserMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

class EmailDTO {
    private String email;

    public EmailDTO() {}
    public EmailDTO(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }
}

class Exist {
    private boolean exists;

    // Constructor, Getters, and Setters
    public Exist(boolean exists) {
        this.exists = exists;
    }

    // Getters and Setters
    public boolean getExists() {
        return this.exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }
}

@RestController
public class MainController {

    private static final Logger logger =  LoggerFactory.getLogger(MainController.class);

    private final UserService userService;
    private final UserMapper userMapper;

    @Autowired
    public MainController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registration) {
        
        logger.info(registration.getUsername() + " " + registration.getPassword() + " " + registration.getEmail());

        boolean done = this.userService.register(userMapper.toDomain(registration));

        if(!done) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists.");
        }

        return ResponseEntity.ok("Registered");
    }


    @PostMapping("/check-email")
    public Exist checkEmail(@RequestBody EmailDTO email) {
        boolean exists = userService.emailExists(email.getEmail());

        logger.info(email.getEmail() + ": " + exists);

        return new Exist(exists);
    }  

}
