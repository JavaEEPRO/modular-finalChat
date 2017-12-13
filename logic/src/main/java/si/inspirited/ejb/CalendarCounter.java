package si.inspirited.ejb;

import si.inspirited.domain.entityes.Line;

import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Stateless
public class CalendarCounter {

    public List<Line> getCalendar() {
        List<Line> currentList = new ArrayList<>();
        Date date = new Date();
        int[][] matrix = new int[9][10];

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
        if (matrix[1][1] == 0) {line3.setCol1(" ");}
        else {line3.setCol1(matrix[1][1]+"");}
        if (matrix[1][2] == 0) {line3.setCol2(" ");}
        else {line3.setCol2(matrix[1][2]+"");}
        if (matrix[1][3] == 0) {line3.setCol3(" ");}
        else {line3.setCol3(matrix[1][3]+"");}
        if (matrix[1][4] == 0) {line3.setCol4(" ");}
        else {line3.setCol4(matrix[1][4]+"");}
        if (matrix[1][5] == 0) {line3.setCol5(" ");}
        else {line3.setCol5(matrix[1][5]+"");}
        if (matrix[1][6] == 0) {line3.setCol6(" ");}
        else {line3.setCol6(matrix[1][6]+"");}
        if (matrix[1][7] == 0) {line3.setCol7(" ");}
        else {line3.setCol7(matrix[1][7]+"");}

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
        if (matrix[6][1] == 0) {line8.setCol1(" ");}
        else {line8.setCol1(matrix[6][1]+"");}
        if (matrix[6][2] == 0) {line8.setCol2(" ");}
        else {line8.setCol2(matrix[6][2]+"");}
        if (matrix[6][3] == 0) {line8.setCol3(" ");}
        else {line8.setCol3(matrix[6][3]+"");}
        if (matrix[6][4] == 0) {line8.setCol4(" ");}
        else {line8.setCol4(matrix[6][4]+"");}
        if (matrix[6][5] == 0) {line8.setCol5(" ");}
        else {line8.setCol5(matrix[6][5]+"");}
        if (matrix[6][6] == 0) {line8.setCol6(" ");}
        else {line8.setCol6(matrix[6][6]+"");}
        if (matrix[6][7] == 0) {line8.setCol7(" ");}
        else {line8.setCol7(matrix[6][7]+"");}

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
        int d;
        if (dateX%7 == 0) {d = 7;}
        else {d = dateX%7;}

        int emptySpaces = (7-(d-dayWeek));
        if (emptySpaces >= 7) {return emptySpaces%7;}
        else {return emptySpaces;}
    }
}
