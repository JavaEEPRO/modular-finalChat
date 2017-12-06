package si.inspirited.ejb;

import org.apache.commons.lang3.StringUtils;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import si.inspirited.domain.entityes.Line;
import si.inspirited.domain.entityes.MessageEntity;
import si.inspirited.domain.entityes.UserEntity;
import si.inspirited.servlets.SessionService;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author  Lord Jesus
 */

@Stateless
public class ChEngine {

    @PersistenceContext(unitName = "examplePU")
    private EntityManager entityManager;

    public boolean checkPassword(String data, String password){
        if(StringUtils.isEmpty(data) || StringUtils.isEmpty(password)){
            return false;
        }

        MessageEntity messageEntity = entityManager.find(MessageEntity.class, data);
        if(messageEntity == null){
            return false;
        }

        if(password.equals(messageEntity.getPassword())){
            return true;
        }

        return false;
    }

    public boolean createMessage(String data, String password){
        if(StringUtils.isEmpty(data)){
            return false;
        }

        MessageEntity messageEntity = entityManager.find(MessageEntity.class, data);
        if(messageEntity != null){
            return false;
        }

        messageEntity = new MessageEntity();
        Date date = new Date();
        long time = date.getTime();
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(time);
        SimpleDateFormat format = new SimpleDateFormat("dd MMM hh:mm:ss");

        messageEntity.setData(data);
        messageEntity.setTime(format.format(calendar.getTime()));
        messageEntity.setAuthor("user: ");
        messageEntity.setPassword(generateColor());
        entityManager.persist(messageEntity);

        return true;
    }

    public List<MessageEntity> getAllMessages(){
        Query query = entityManager.createQuery("select entity from MessageEntity entity");

        List<MessageEntity> rl = query.getResultList();
        List<MessageEntity> reverse = new ArrayList<MessageEntity>();

        for (MessageEntity message: rl) {
            reverse.add(0, message);
        }
        return reverse;
    }

    int i = 0;
    public String generateColor() {
        i++;
        if (i%2==0) {return "#7fffd4";}
        return "#ffe4c4";
    }

    private List<UserEntity> currentList = new ArrayList<UserEntity>();

    public void createUser() {
        UserEntity user = new UserEntity();
        Random rnd = new Random();
        String suff = rnd.nextInt(777) + "";
        user.setLogin("user " + suff);
        SessionService service = new SessionService();
        user.setSess(service.getSess());
        currentList.add(user);
        //return true;
    }
    public List<UserEntity> getUserList() {
        return currentList;
    }

    public List<Line> getCalendar() {
        List<Line> currentList = new ArrayList<>();
        Date date = new Date();
        int[][] matrix = new int[8][8];

        Line line1 = new Line();
        line1.setCol1("m");
        line1.setCol2("o");
        line1.setCol3("n");
        line1.setCol4("t");
        line1.setCol5("h");
        line1.setCol6(":");
        Calendar calendar = Calendar.getInstance();
        int month = calendar.get(Calendar.MONTH);
        line1.setCol7(month+1+"");



        Line line2 = new Line();
        int index;
        for (index = 0; index <= emptySpaces(); index++) {
            matrix[1][index] = 0;
        }
        int daysSet = 0;
        int counter = 1;

        for (int i = index; i <= 7; i++) {matrix[1][i] = counter; counter++; daysSet++;}
   label1:
         for (int lines = 2; lines < 7; lines++) {
             for (int i = 1; i <= 7; i++) {
                 //for (int day = counter-index; day < 31; day++) {
                 matrix[lines][i] = counter;
                 counter++;
                 daysSet++;
                 if (calendar.get(Calendar.MONTH)==0 && counter>31) {break label1;}
                 if (calendar.get(Calendar.MONTH)==2 && counter>31) {break label1;}
                 if (calendar.get(Calendar.MONTH)==4 && counter>31) {break label1;}
                 if (calendar.get(Calendar.MONTH)==6 && counter>31) {break label1;}
                 if (calendar.get(Calendar.MONTH)==7 && counter>31) {break label1;}
                 if (calendar.get(Calendar.MONTH)==9 && counter>31) {break label1;}
                 if (calendar.get(Calendar.MONTH)==11 && counter>31) {break label1;}

                 if (calendar.get(Calendar.MONTH)==1 && counter>28) {break label1;}
                 if (calendar.get(Calendar.MONTH)==3 && counter>30) {break label1;}
                 if (calendar.get(Calendar.MONTH)==5 && counter>30) {break label1;}
                 if (calendar.get(Calendar.MONTH)==8 && counter>30) {break label1;}
                 if (calendar.get(Calendar.MONTH)==10 && counter>30) {break label1;}
             }
         }


        line2.setCol1("Su");
        line2.setCol2("Mo");
        line2.setCol3("Tu");
        line2.setCol4("We");
        line2.setCol5("Th");
        line2.setCol6("Fr");
        line2.setCol7("Sa");

        Line line3 = new Line();
        line3.setCol1(matrix[1][1]+"");
        line3.setCol2(matrix[1][2]+"");
        line3.setCol3(matrix[1][3]+"");
        line3.setCol4(matrix[1][4]+"");
        line3.setCol5(matrix[1][5]+"");
        line3.setCol6(matrix[1][6]+"");
        line3.setCol7(matrix[1][7]+"");

        Line line4 = new Line();
        line4.setCol1(matrix[2][1]+"");
        line4.setCol2(matrix[2][2]+"");
        line4.setCol3(matrix[2][3]+"");
        line4.setCol4(matrix[2][4]+"");
        line4.setCol5(matrix[2][5]+"");
        line4.setCol6(matrix[2][6]+"");
        line4.setCol7(matrix[2][7]+"");

        Line line5 = new Line();
        line5.setCol1(matrix[3][1]+"");
        line5.setCol2(matrix[3][2]+"");
        line5.setCol3(matrix[3][3]+"");
        line5.setCol4(matrix[3][4]+"");
        line5.setCol5(matrix[3][5]+"");
        line5.setCol6(matrix[3][6]+"");
        line5.setCol7(matrix[3][7]+"");

        Line line6 = new Line();
        line6.setCol1(matrix[4][1]+"");
        line6.setCol2(matrix[4][2]+"");
        line6.setCol3(matrix[4][3]+"");
        line6.setCol4(matrix[4][4]+"");
        line6.setCol5(matrix[4][5]+"");
        line6.setCol6(matrix[4][6]+"");
        line6.setCol7(matrix[4][7]+"");

        Line line7 = new Line();
        line7.setCol1(matrix[5][1]+"");
        line7.setCol2(matrix[5][2]+"");
        line7.setCol3(matrix[5][3]+"");
        line7.setCol4(matrix[5][4]+"");
        line7.setCol5(matrix[5][5]+"");
        line7.setCol6(matrix[5][6]+"");
        line7.setCol7(matrix[5][7]+"");

        Line line8 = new Line();
        line8.setCol1(matrix[6][1]+"");
        line8.setCol2(matrix[6][2]+"");
        line8.setCol3(matrix[6][3]+"");
        line8.setCol4(matrix[6][4]+"");
        line8.setCol5(matrix[6][5]+"");
        line8.setCol6(matrix[6][6]+"");
        line8.setCol7(matrix[6][7]+"");

        currentList.add(line1);
        currentList.add(line2);
        currentList.add(line3);
        currentList.add(line4);
        currentList.add(line5);
        currentList.add(line6);
        currentList.add(line7);
        currentList.add(line8);

        return currentList;
        //Collections.emptyList();
    }

    public int emptySpaces() {
        Calendar calendar = Calendar.getInstance();
        int dateX = calendar.get(Calendar.DAY_OF_MONTH);
        int dayWeek = calendar.get(Calendar.DAY_OF_WEEK);
        /*if((dateX % 7 + dayWeek + 1) > 7) {return (dateX % 7 + dayWeek - 6);}
        else if((dateX % 7 + dayWeek + 1) == 7) {return 0;}
        else return (dateX % 7 + dayWeek + 1);*/
        return (7-(dateX%7-dayWeek));
    }
}