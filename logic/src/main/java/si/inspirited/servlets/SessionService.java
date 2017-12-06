package si.inspirited.servlets;

import si.inspirited.ejb.ChEngine;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(urlPatterns = "/")
public class SessionService  extends HttpServlet {

    private boolean hasSession;

    public Object getSess() {
        return sess;
    }

    public void setSess(Object sess) {
        this.sess = sess;
    }

    private Object sess;


    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().append("forgive me Lord " + req.getMethod());

        HttpSession session = req.getSession();

        if (session.getValue("name") == null) {
            hasSession = false;
            ChEngine engine = new ChEngine();
            engine.createUser();
        }else{
            hasSession = true;
            sess = session.getValue("name");
        }
    }

    public boolean isHasSession() {
        return hasSession;
    }

    public void setHasSession(boolean hasSession) {
        this.hasSession = hasSession;
    }

}
