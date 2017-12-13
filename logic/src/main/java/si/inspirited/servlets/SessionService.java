package si.inspirited.servlets;

import si.inspirited.domain.entityes.UserEntity;
import si.inspirited.ejb.ChEngine;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

import javax.ejb.EJB;

@WebServlet(urlPatterns = "*")
public class SessionService  extends HttpServlet {

    @EJB
    private ChEngine chEngine;

    private boolean hasSession;


    private String sessName;


    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().append("forgive me Lord " + req.getMethod());

        HttpSession session = req.getSession();

        if (session.getAttribute("name") == null) {
            hasSession = false;
            /*UserEntity newUser = chEngine.createUser();
            session.setAttribute("name", "newUser.getLogin");
            newUser.setLogin((String)session.getAttribute("name"));
            newUser.setSessName((String)session.getAttribute("name"));
            chEngine.getEntityManager().persist(newUser);*/
            //chEngine.findUname();
        }else{
            hasSession = true;
            sessName = (String)session.getValue("name");
        }
    }

    public boolean isHasSession() {
        return hasSession;
    }

    public void setHasSession(boolean hasSession) {
        this.hasSession = hasSession;
    }

    public String getSess() {
        return sessName;
    }

    public void setSessName(String sessName) {
        this.sessName = sessName;
    }

}
