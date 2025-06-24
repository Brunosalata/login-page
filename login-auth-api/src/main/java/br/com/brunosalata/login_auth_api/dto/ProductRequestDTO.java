package br.com.brunosalata.login_auth_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;
/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public record ProductRequestDTO(
        @NotBlank
        String name,

        @NotNull
        Integer price
) {
}
