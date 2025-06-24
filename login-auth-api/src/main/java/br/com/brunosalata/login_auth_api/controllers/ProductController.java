package br.com.brunosalata.login_auth_api.controllers;

import br.com.brunosalata.login_auth_api.domain.Product;
import br.com.brunosalata.login_auth_api.dto.ProductRequestDTO;
import br.com.brunosalata.login_auth_api.dto.ProductResponseDTO;
import br.com.brunosalata.login_auth_api.repositories.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @PostMapping
    public ResponseEntity postProduct(@RequestBody @Valid ProductRequestDTO body){
        Product newProduct = new Product(body);

        this.productRepository.save(newProduct);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getAllProducts(){
        List<ProductResponseDTO> productList = this.productRepository.findAll().stream().map(ProductResponseDTO::new).toList();

        return ResponseEntity.ok(productList);
    }

}
