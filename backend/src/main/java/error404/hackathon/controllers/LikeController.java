package error404.hackathon.controllers;

import org.springframework.web.bind.annotation.RestController;

import error404.hackathon.domains.UserDomain;
import error404.hackathon.services.LikeService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/{likedId}")
public class LikeController {
    
    @Autowired
    private LikeService likeService;

    @PostMapping("/{likedId}")
    public ResponseEntity<String> likeUser(@RequestParam("likerId") int likerId, @PathVariable("likebyId") int likedId) {
        likeService.likeUser(likerId, likedId);
        return ResponseEntity.ok("User liked");
    }

    @GetMapping("/liked/{userId}")
    public ResponseEntity<Set<UserDomain>> getLikedUsers(@PathVariable("userId") int userId) {
        return ResponseEntity.ok(likeService.getLikedUsers(userId));
    }

    @GetMapping("/liked-by/{userId}")
    public ResponseEntity<Set<UserDomain>> getLikedByUsers(@PathVariable("userId") int userId) {
        return ResponseEntity.ok(likeService.getLikedByUsers(userId));
    }
}
