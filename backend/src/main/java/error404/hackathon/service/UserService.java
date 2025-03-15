package error404.hackathon.service;

import error404.hackathon.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(Long id);
    List<User> getAllUsers();
    void likePost(Long userId, Long postId);
}