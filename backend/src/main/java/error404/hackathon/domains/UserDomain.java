package error404.hackathon.domains;

import java.util.HashSet;
import java.util.Set;

// import org.springframework.boot.autoconfigure.security.SecurityProperties.User;

import jakarta.persistence.*;

@Entity
@Table(name="user")
public class UserDomain {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column
    private String username;

    @Column(unique = true)
    private String email;

    @Column(name="password_hash")
    private String password;

    @ManyToMany
    @JoinTable(
        name = "user_likes",
        joinColumns = @JoinColumn(name = "liker_id"),
        inverseJoinColumns = @JoinColumn(name = "liked_id")
    )
    private Set<UserDomain> likedUsers = new HashSet<>();

    @ManyToMany(mappedBy = "likedUsers")
    private Set<UserDomain> likedByUsers = new HashSet<>();

    public void likeUser(UserDomain likedUser){
        likedByUsers.add(likedUser);
    }


    public UserDomain(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<UserDomain> getLikedUsers(){
        return this.likedUsers;
    }

    public Set<UserDomain> getLikedByUsers(){
        return this.likedByUsers;
    }
}
