package br.com.brunosalata.login_auth_api.repositories;

import br.com.brunosalata.login_auth_api.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public interface ProductRepository extends JpaRepository<Product, String> {
}
