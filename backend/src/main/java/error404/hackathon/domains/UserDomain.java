package error404.hackathon.domains;

import jakarta.persistence.*;

@Entity
@Table(name="userentity")
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
}
