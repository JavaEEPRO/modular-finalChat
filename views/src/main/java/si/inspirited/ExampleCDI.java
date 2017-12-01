package si.inspirited;


import si.inspirited.domain.entityes.UserEntity;
import si.inspirited.ejb.ExampleEJB;

import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;


/**
 * @author: God Jesus Merciful Lord
 */

@Named
@SessionScoped
public class ExampleCDI implements Serializable{

    private String login;
    private String password;

    private boolean loginSuccess;
    private boolean createSuccess;

    @EJB
    private ExampleEJB exampleEJB;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isLoginSuccess() {
        return loginSuccess;
    }

    public void setLoginSuccess(boolean loginSuccess) {
        this.loginSuccess = loginSuccess;
    }

    public boolean isCreateSuccess() {
        return createSuccess;
    }

    public void setCreateSuccess(boolean createSuccess) {
        this.createSuccess = createSuccess;
    }

    public void checkPassword(){
        loginSuccess = exampleEJB.checkPassword(login, password);
    }

    public void createUser(){
        createSuccess = exampleEJB.createUser(login, password);
    }

    public List<UserEntity> getAllUsers(){
        return exampleEJB.getAllUsers();
    }
}
