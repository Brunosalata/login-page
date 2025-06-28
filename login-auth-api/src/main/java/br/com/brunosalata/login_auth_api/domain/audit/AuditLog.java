package br.com.brunosalata.login_auth_api.domain.audit;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@Entity
@Table(name = "audit_log")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private AuditAction action; // EX: DELETE_USER, UPDATE_PRODUCT, LOGIN, etc.

    private String actorEmail;      // quem fez
    private String targetResource;  // entidade afetada (User, Product, etc.)
    private String targetId;        // id do alvo (pode ser email, id numérico, etc.)

    private String details;         // explicações adicionais

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}
