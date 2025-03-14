package error404.hackathon.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import error404.hackathon.HackathonApplication;
import error404.hackathon.domains.UserDomain;
import error404.hackathon.repositories.UserRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(UserRepository userRepository, HackathonApplication hackathonApplication) {
        this.userRepository = userRepository;
    }

    public boolean register(UserDomain user) {
        /*
         * Make sure that name and/or email does not exist
         */
        if(this.emailExists(user.getEmail())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return true;
    }

    public boolean emailExists(String email) {
        return this.userRepository.existsByEmail(email);
    }

}