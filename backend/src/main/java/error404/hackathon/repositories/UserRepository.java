package error404.hackathon.repositories;

import org.springframework.data.repository.CrudRepository;
import error404.hackathon.domains.UserDomain;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends CrudRepository<UserDomain, Integer> {
    List<UserDomain> findByUsername(String username);
    boolean existsByEmail(String email);
    Optional<UserDomain> findById(int Id);

}
