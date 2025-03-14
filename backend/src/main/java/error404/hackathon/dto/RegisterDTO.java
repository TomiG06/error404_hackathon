package error404.hackathon.dto;

public class RegisterDTO {
    private  String username;
    private  String email;
    private  String password;

    public RegisterDTO() {}

    public RegisterDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }
}
