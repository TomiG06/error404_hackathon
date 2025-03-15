package error404.hackathon.controllers;

import error404.hackathon.entity.User;
import error404.hackathon.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/{userId}/like/{postId}")
    public ResponseEntity<String> likePost(@PathVariable("userId") Long userId, @PathVariable("postId") Long postId) {
        userService.likePost(userId, postId);
        return ResponseEntity.ok("Post liked successfully");
    }
}