package br.com.brunosalata.login_auth_api.dto;

import br.com.brunosalata.login_auth_api.domain.user.UserRole;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public record UserInfoResponseDTO(String name, String email, UserRole role) {
}
