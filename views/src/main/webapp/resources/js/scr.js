
/*calendar*/
/*
function calendar2(id, year, month) {
    month=["January","February","March","April","May","June","July","August","September","October","November","December"]; // название месяца, вместо цифр 0-11

    var
        Dlast = new Date(year,month+1,0).getDate(),// последний день месяца
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(), // день недели последнего дня месяца
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(), // день недели первого дня месяца
        calendar = '<tr>';

    // пустые клетки до первого дня текущего месяца
    if (DNfirst !== 0) {
        for(var  i = 1; i < DNfirst; i++) calendar = calendar + '<td> </td>';
    }

    else{ // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток
        for(i = 0; i < 6; i++) calendar = calendar + '<td> </td>';
    }

    // дни месяца
        for(i = 1; i <= Dlast; i++) {
        if (i === new Date().getDate() && D.getFullYear() === new Date().getFullYear() && D.getMonth() === new Date().getMonth()) {
            calendar = calendar + '<td class="today">' + i + '</td>'; // сегодняшней дате можно задать стиль CSS!!!
        }else{
            calendar += '<td>' + i + '</td>';
        }
        if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {  // если день выпадает на воскресенье, то перевод строки
            calendar += '</tr><tr>';
        }
    }

    // пустые клетки после последнего дня месяца??
    for(i = DNlast; i < 7; i++)
        calendar = calendar + '<td>&nbsp;</td>';
    document.querySelector('#'+id+' tbody').innerHTML = (calendar+'</tr>');
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
    }
}
calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
};
// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
};
*/

/*calendar*/

function calendar2(id, year, month) {
    month=["January","February","March","April","May","June","July","August","September","October","November","December"]; // название месяца, вместо цифр 0-11

    console.log(month);
    /*
    var
        Dlast = new Date(year,month+1,0).getDate(),// последний день месяца
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(), // день недели последнего дня месяца
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(), // день недели первого дня месяца
        calendar = '<tr>';

    // пустые клетки до первого дня текущего месяца
    if (DNfirst !== 0) {
        for(var  i = 1; i < DNfirst; i++) calendar = calendar + '<td> </td>';
    }

    else{ // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток
        for(i = 0; i < 6; i++) calendar = calendar + '<td> </td>';
    }

    // дни месяца
        for(i = 1; i <= Dlast; i++) {
        if (i === new Date().getDate() && D.getFullYear() === new Date().getFullYear() && D.getMonth() === new Date().getMonth()) {
            calendar = calendar + '<td class="today">' + i + '</td>'; // сегодняшней дате можно задать стиль CSS!!!
        }else{
            calendar += '<td>' + i + '</td>';
        }
        if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {  // если день выпадает на воскресенье, то перевод строки
            calendar += '</tr><tr>';
        }
    }

    // пустые клетки после последнего дня месяца??
    for(i = DNlast; i < 7; i++)
        calendar = calendar + '<td>&nbsp;</td>';
    document.querySelector('#'+id+' tbody').innerHTML = (calendar+'</tr>');
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
    }
}
calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
};
// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);

    */
};

calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());