package br.com.brunosalata.login_auth_api.service;

import br.com.brunosalata.login_auth_api.domain.audit.AuditAction;
import br.com.brunosalata.login_auth_api.domain.audit.AuditLog;
import br.com.brunosalata.login_auth_api.repositories.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@Service
public class AuditLogService {
    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(AuditAction action, String actorEmail, String targetResource, String targetId, String details) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setActorEmail(actorEmail);
        log.setTargetResource(targetResource);
        log.setTargetId(targetId);
        log.setDetails(details);
        auditLogRepository.save(log);
    }
}
