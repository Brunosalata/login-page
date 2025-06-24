package br.com.brunosalata.login_auth_api.domain.product;

import br.com.brunosalata.login_auth_api.dto.ProductRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@Table(name = "product")
@Entity(name = "product")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private Integer price;

    public Product(ProductRequestDTO data){
        this.price = data.price();
        this.name = data.name();
    }

}
