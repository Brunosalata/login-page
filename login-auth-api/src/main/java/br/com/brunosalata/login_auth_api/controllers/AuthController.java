package br.com.brunosalata.login_auth_api.controllers;

import br.com.brunosalata.login_auth_api.domain.audit.AuditAction;
import br.com.brunosalata.login_auth_api.domain.user.User;
import br.com.brunosalata.login_auth_api.domain.user.UserRole;
import br.com.brunosalata.login_auth_api.dto.LoginRequestDTO;
import br.com.brunosalata.login_auth_api.dto.RegisterRequestDTO;
import br.com.brunosalata.login_auth_api.dto.ResponseDTO;
import br.com.brunosalata.login_auth_api.infra.security.TokenService;
import br.com.brunosalata.login_auth_api.repositories.UserRepository;
import br.com.brunosalata.login_auth_api.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    @Autowired
    private AuditLogService auditLogService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        UserDetails user = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getUsername(), token));
        }

        auditLogService.log(
                AuditAction.LOGIN,
                user.getUsername(),
                "Auth",
                user.getUsername(),
                "Login realizado com sucesso"
        );

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register/user")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body){
        Optional<UserDetails> user = this.repository.findByEmail(body.email());
        if(user.isEmpty()){
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            newUser.setRole(UserRole.USER);
            this.repository.save(newUser);
            String token = this.tokenService.generateToken(newUser);

            auditLogService.log(
                    AuditAction.CREATE_USER,
                    newUser.getName(),
                    "User",
                    newUser.getEmail(),
                    "Novo usuário Cadastrado"
            );

            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerAsAdmin(@RequestBody RegisterRequestDTO body) {
        Optional<UserDetails> user = this.repository.findByEmail(body.email());
        if(user.isEmpty()){
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            newUser.setRole(body.role());
            this.repository.save(newUser);
            String token = this.tokenService.generateToken(newUser);

            auditLogService.log(
                    AuditAction.CREATE_USER,
                    body.email(),
                    "User",
                    newUser.getEmail(),
                    "Admin cadastrou novo usuário"
            );

            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}
