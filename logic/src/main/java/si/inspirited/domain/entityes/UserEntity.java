package si.inspirited.domain.entityes;


import javax.persistence.Id;


public class UserEntity {

    @Id
    private String login;

    private Object sess;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Object getSess() {
        return sess;
    }

    public void setSess(Object sess) {
        this.sess = sess;
    }



}
