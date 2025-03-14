package error404.hackathon.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import error404.hackathon.domains.UserDomain;
import error404.hackathon.repositories.UserRepository;

@Service
public class LikeService {
    
    @Autowired
    private UserRepository userRepository;

    public void likeUser(int likerId, int likedId) {
        UserDomain liker = userRepository.findById(likerId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        UserDomain liked = userRepository.findById(likedId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        liker.likeUser(liked);
        userRepository.save(liker);
    }

    public Set<UserDomain> getLikedUsers(int userId) {
        UserDomain user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getLikedUsers();
    }

    public Set<UserDomain> getLikedByUsers(int userId) {
        UserDomain user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getLikedByUsers();
    }

}
