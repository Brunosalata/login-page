package br.com.brunosalata.login_auth_api.repositories;

import br.com.brunosalata.login_auth_api.domain.audit.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public interface AuditLogRepository extends JpaRepository<AuditLog, String> {
}
