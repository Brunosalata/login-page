package br.com.brunosalata.login_auth_api.controllers;

import br.com.brunosalata.login_auth_api.domain.user.User;
import br.com.brunosalata.login_auth_api.dto.UserInfoResponseDTO;
import br.com.brunosalata.login_auth_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/info")
    public ResponseEntity<UserInfoResponseDTO> getUsers(Authentication authentication){
        String email = authentication.getName(); // equivale ao sub do token

        User user = userRepository.findInfoByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        UserInfoResponseDTO response = new UserInfoResponseDTO(user.getName(), user.getEmail(), user.getRole());

        return ResponseEntity.ok(response);
    }
}
