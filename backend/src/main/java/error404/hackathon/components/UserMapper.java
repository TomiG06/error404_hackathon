package error404.hackathon.components;

import org.springframework.stereotype.Component;

import error404.hackathon.domains.UserDomain;
import error404.hackathon.dto.RegisterDTO;

@Component
public class UserMapper {
    public UserDomain toDomain(RegisterDTO registry) {
        return new UserDomain(registry.getUsername(), registry.getEmail(), registry.getPassword());
    }
}
