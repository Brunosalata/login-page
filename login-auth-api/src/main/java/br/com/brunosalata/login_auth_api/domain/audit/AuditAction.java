package br.com.brunosalata.login_auth_api.domain.audit;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public enum AuditAction {
    LOGIN,
    LOGOUT,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    SYSTEM_ERROR
}
