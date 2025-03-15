package error404.hackathon.service;

import error404.hackathon.entity.Post;
import java.util.List;
import java.util.Optional;

public interface PostService {
    Post savePost(Post post);
    Optional<Post> getPostById(Long id);
    List<Post> getAllPosts();
}
