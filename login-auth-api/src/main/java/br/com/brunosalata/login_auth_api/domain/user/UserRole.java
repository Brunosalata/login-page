package br.com.brunosalata.login_auth_api.domain.user;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
public enum UserRole {
    ADMIN("admin"),
    USER("user");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
