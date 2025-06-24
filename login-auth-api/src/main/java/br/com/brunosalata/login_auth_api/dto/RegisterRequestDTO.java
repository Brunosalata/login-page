package br.com.brunosalata.login_auth_api.dto;

import br.com.brunosalata.login_auth_api.domain.user.UserRole;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public record RegisterRequestDTO(String name, String email, String password, UserRole role) {
}
