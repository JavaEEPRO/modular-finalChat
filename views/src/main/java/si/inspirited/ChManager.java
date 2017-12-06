package si.inspirited;

import si.inspirited.domain.entityes.Line;
import si.inspirited.domain.entityes.UserEntity;
import si.inspirited.ejb.ChEngine;
import si.inspirited.domain.entityes.MessageEntity;

import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Jesus Lord
 */

@Named
@SessionScoped
public class ChManager implements Serializable{


    @Size(max=233, message="max message length 233 char")
    private String data;
    private String password;
    private String color;
    private String uname;

    private boolean loginSuccess;
    private boolean createSuccess;
    private boolean pickedSuccess;

    @EJB
    private ChEngine chEngine;



    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
    public void resetData() {
        this.data = "";
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

    public boolean isPickedSuccess() {
        return pickedSuccess;
    }

    public void setPickedSuccess(boolean pickedSuccess) {
        this.pickedSuccess = pickedSuccess;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public void setCreateSuccess(boolean createSuccess) {
        this.createSuccess = createSuccess;
    }

    public void checkPassword(){
        loginSuccess = chEngine.checkPassword(data, password);
    }

    public void createMessage(){
        createSuccess = chEngine.createMessage(data, password);
    }

    public List<MessageEntity> getAllMessages(){
        return chEngine.getAllMessages();
    }

    public List<UserEntity> getUserList() {return chEngine.getUserList();}

    public List<Line> getCalendar() {return chEngine.getCalendar();}

    public void generateColor() {}


}