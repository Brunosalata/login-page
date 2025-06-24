package br.com.brunosalata.login_auth_api.dto;

import br.com.brunosalata.login_auth_api.domain.product.Product;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public record ProductResponseDTO(String id, String name, Integer price) {
    public ProductResponseDTO(Product product){
        this(product.getId(), product.getName(), product.getPrice());
    }
}
