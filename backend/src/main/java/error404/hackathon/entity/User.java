package error404.hackathon.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

// import org.springframework.boot.autoconfigure.security.SecurityProperties.User;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column
    private String facebook;

    @Column
    private String insta;

    @Column 
    private String phone;

    @Column(name = "password_hash")
    private String password;

    // One user can create multiple posts
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Post> posts = new HashSet<>();

    // Posts that this user liked
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
        name = "user_liked_posts",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private Set<Post> likedPosts = new HashSet<>();

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(String username, String email, String facebook, String password) {
        this.username = username;
        this.email = email;
        this.facebook = facebook;
        this.password = password;
    }

    public User(String username, String email, String insta, String facebook, String phone, String password) {
        this.username = username;
        this.email = email;
        this.insta = insta;
        this.facebook = facebook;
        this.phone = phone;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Set<Post> getPosts() { return posts; }
    public void setPosts(Set<Post> posts) { this.posts = posts; }

    public Set<Post> getLikedPosts() { return likedPosts; }
    public void setLikedPosts(Set<Post> likedPosts) { this.likedPosts = likedPosts; }

    public String getFacebook() { return facebook; }
    public void setFacebook(String facebook) { this.facebook = facebook; }

    public String getInsta() { return insta; }
    public void setinsta(String insta) { this.insta = insta; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
