package br.com.brunosalata.login_auth_api.controllers;

import br.com.brunosalata.login_auth_api.domain.audit.AuditAction;
import br.com.brunosalata.login_auth_api.domain.user.User;
import br.com.brunosalata.login_auth_api.dto.UpdateUserRequestDTO;
import br.com.brunosalata.login_auth_api.dto.UserInfoResponseDTO;
import br.com.brunosalata.login_auth_api.repositories.UserRepository;
import br.com.brunosalata.login_auth_api.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping("/info")
    public ResponseEntity<UserInfoResponseDTO> getUser(Authentication authentication){
        String email = authentication.getName(); // equivale ao sub do token

        User user = userRepository.findInfoByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        UserInfoResponseDTO response = new UserInfoResponseDTO(user.getName(), user.getEmail(), user.getRole());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserInfoResponseDTO>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserInfoResponseDTO> response = users.stream()
                .map(user -> new UserInfoResponseDTO(user.getName(), user.getEmail(), user.getRole()))
                .toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequestDTO dto, Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findInfoByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        user.setName(dto.name());

        if (dto.password() != null && !dto.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.password()));
        }

        userRepository.save(user);

        auditLogService.log(
                AuditAction.UPDATE_USER,
                authentication.getName(),
                "User",
                user.getEmail(),
                "Usuário alterou seus dados"
        );

        return ResponseEntity.ok("Usuário atualizado com sucesso.");
    }

    @PutMapping("/admin/update/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserAsAdmin(
            @PathVariable String email,
            @RequestBody UpdateUserRequestDTO dto
    ) {
        User user = userRepository.findInfoByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (dto.name() != null && !dto.name().isBlank()) {
            user.setName(dto.name());
        }

        if (dto.password() != null && !dto.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.password()));
        }

        userRepository.save(user);

        auditLogService.log(
                AuditAction.UPDATE_USER,
                user.getName(),
                "User",
                user.getEmail(),
                "Admin alterou dados do usuário"
        );

        return ResponseEntity.ok("Usuário atualizado com sucesso.");
    }

    @DeleteMapping("/delete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteOwnAccount(Authentication authentication) {
        return deleteUserByEmail(authentication.getName(), authentication, false);
    }

    @DeleteMapping("/admin/delete/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAnyUser(@PathVariable String email, Authentication authentication) {
        return deleteUserByEmail(email, authentication, true);
    }

    /**
     * Deleta um usuário com base no e-mail, respeitando regras de segurança.
     * @param email E-mail do usuário a ser deletado
     * @param authentication Contexto do usuário autenticado
     * @param isAdminOperated Define se a operação é feita por um ADMIN
     */
    private ResponseEntity<?> deleteUserByEmail(String email, Authentication authentication, boolean isAdminOperated) {
        User user = userRepository.findInfoByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        // Regra: ADMIN não pode deletar outro ADMIN, a não ser que seja ele mesmo
        if (isAdminOperated &&
                user.getRole().equals("ROLE_ADMIN") &&
                !user.getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Você não pode deletar outros administradores.");
        }

        userRepository.delete(user);

        auditLogService.log(
                AuditAction.DELETE_USER,
                authentication.getName(),
                "User",
                user.getEmail(),
                isAdminOperated ? "Admin deletou usuário" : "Usuário deletou sua conta"
        );

        return ResponseEntity.ok("Usuário excluído com sucesso.");
    }
}
