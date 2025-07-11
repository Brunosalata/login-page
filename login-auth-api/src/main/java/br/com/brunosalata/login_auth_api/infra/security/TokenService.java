package br.com.brunosalata.login_auth_api.infra.security;

import br.com.brunosalata.login_auth_api.domain.user.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;
    public String generateToken(UserDetails user){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            // Extrair roles do UserDetails
            List<String> roles = user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority) // ex: "ROLE_ADMIN"
                    .collect(Collectors.toList());

            return JWT.create()
                    .withIssuer("login-auth-api")
                    .withSubject(user.getUsername())
                    .withClaim("roles", roles) // <-- Aqui adiciona as roles no payload
                    .withExpiresAt(this.generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while authenticating");
        }
    }

    public String validateToken(String token){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("login-auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e){
            return null;
        }
    }

    private Instant generateExpirationDate(){
        return LocalDateTime.now().plusMinutes(10).toInstant(ZoneOffset.of("-3"));
    }
}
