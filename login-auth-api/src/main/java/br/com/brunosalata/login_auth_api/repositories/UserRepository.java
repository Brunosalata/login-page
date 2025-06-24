package br.com.brunosalata.login_auth_api.repositories;

import br.com.brunosalata.login_auth_api.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public interface UserRepository extends JpaRepository<User, String> {
    // Optional, porque pode ou não encontrar um usuário com esse email
    Optional<UserDetails> findByEmail(String email);
}
