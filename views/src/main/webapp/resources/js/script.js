/*
/*test dissappear 2*/

setTimeout(function(){$('.startannounce').fadeOut('slow')},7550);  //30000 = 30 секунд

/*

/*calendar*/

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


/*gradient for HEADER rotate-around-the-clock*/

//jQuery(document).ready(function () {
function ratota() {
    var degrees = 0;
    setInterval(function () {
        degrees++;
        jQuery("#header").css("background-image", "linear-gradient(" + degrees + "deg,#0A5794,#fafafa)");
    }, 60000 / 360);
}

ratota();
//});
/*test passed OK*/
/*END OF gradient for HEADER rotate-around-the-clock*/

/*search on the HEADERs center*/

jQuery(document).ready(function() {
    var minlen = 3; // минимальная длина слова
    var paddingtop = 30; // отступ сверху при прокрутке
    var scrollspeed = 200; // время прокрутки
    var keyint = 1000; // интервал между нажатиями клавиш
    var term = '';
    var n = 0;
    var time_keyup = 0;
    var time_search = 0;


    jQuery('body').delegate('#spgo', 'click', function () {
        jQuery('body,html').animate({scrollTop: jQuery('span.highlight:first').offset().top - paddingtop}, scrollspeed); // переход к первому фрагменту
    });

    function dosearch() {
        term = jQuery('#spterm').val();
        jQuery('span.highlight').each(function () { //удаляем старую подсветку
            jQuery(this).after(jQuery(this).html()).remove();
        });
        var t = '';
        jQuery('div.content').each(function () { // в селекторе задаем область поиска
            jQuery(this).html(jQuery(this).html().replace(new RegExp(term, 'ig'), '<span class="highlight">$&</span>')); // выделяем найденные фрагменты
            n = jQuery('span.highlight').length; // количество найденных фрагментов
            console.log('n = ' + n);
            if (n == 0)
                jQuery('#spresult').html('Ничего не найдено');
            else
                jQuery('#spresult').html('    Results: ' + n + '. <span class="splink" id="spgo">Перейти</span>');
            if (n > 1) // если больше одного фрагмента, то добавляем переход между ними
            {
                var i = 0;
                jQuery('span.highlight').each(function (i) {
                    jQuery(this).attr('n', i++); // нумеруем фрагменты, более простого способа искать следующий элемент не нашел
                });
                jQuery('span.highlight').not(':last').attr({title: 'Нажмите, чтобы перейти к следующему фрагменту'}).click(function () { // всем фрагментам, кроме последнего, добавляем подсказку
                    jQuery('body,html').animate({scrollTop: jQuery('span.highlight:gt(' + jQuery(this).attr('n') + '):first').offset().top - paddingtop}, scrollspeed); // переход к следующему фрагменту
                });
                jQuery('span.highlight:last').attr({title: 'Нажмите, чтобы вернуться к форме поиска'}).click(function () {
                    jQuery('body,html').animate({scrollTop: jQuery('#spterm').offset().top - paddingtop}, scrollspeed); // переход к форме поиска
                });
            }
        });
    }


    jQuery('#spterm').keyup(function () {
        var d1 = new Date();
        time_keyup = d1.getTime();
        if (jQuery('#spterm').val() != term) // проверяем, изменилась ли строка
            if (jQuery('#spterm').val().length >= minlen) { // проверяем длину строки
                setTimeout(function () { // ждем следующего нажатия
                    var d2 = new Date();
                    time_search = d2.getTime();
                    if (time_search - time_keyup >= keyint) // проверяем интервал между нажатиями
                        dosearch(); // если все в порядке, приступаем к поиску
                }, keyint);
            }
            else
                jQuery('#spresult').html('&nbsp'); // если строка короткая, убираем текст из DIVа с результатом
    });

    if (window.location.hash != "") // бонус
    {
        var t = window.location.hash.substr(1, 50); // вырезаем текст
        jQuery('#spterm').val(t).keyup(); // вставляем его в форму поиска
        jQuery('#spgo').click(); // переходим к первому фрагменту
    }
});
/*test passed OK*/
/*END OF THE search on the HEADERs center*/

/*search2(extended)*/

jQuery(document).ready(function(){
    var minlen = 3; // минимальная длина слова
    var paddingtop = 30; // отступ сверху при прокрутке
    var scrollspeed = 200; // время прокрутки
    var keyint = 1000; // интервал между нажатиями клавиш
    var term = '';
    var n = 0;
    var time_keyup = 0;
    var time_search = 0;

    jQuery('body').delegate('#spgo', 'click', function(){
        jQuery('body,html').animate({scrollTop: jQuery('span.highlight:first').offset().top-paddingtop}, scrollspeed); // переход к первому фрагменту
    });

    function dosearch() {
        term = jQuery('#spterm2').val();
        jQuery('span.highlight').each(function(){ //удаляем старую подсветку
            jQuery(this).after(jQuery(this).html()).remove();
        });
        var t = '';
        jQuery('div.content').each(function(){ // в селекторе задаем область поиска
            jQuery(this).html(jQuery(this).html().replace(new RegExp(term, 'ig'), '<span class="highlight">$&</span>')); // выделяем найденные фрагменты
            n = jQuery('span.highlight').length; // количество найденных фрагментов
            console.log('n = '+n);
            if (n==0)
                jQuery('#spresult2').html('Ничего не найдено');
            else
                jQuery('#spresult2').html('    Results: '+n+'. <span class="splink" id="spgo">Перейти</span>');
            if (n>1) // если больше одного фрагмента, то добавляем переход между ними
            {
                var i = 0;
                jQuery('span.highlight').each(function(i){
                    jQuery(this).attr('n', i++); // нумеруем фрагменты, более простого способа искать следующий элемент не нашел
                });
                jQuery('span.highlight').not(':last').attr({title: 'Нажмите, чтобы перейти к следующему фрагменту'}).click(function(){ // всем фрагментам, кроме последнего, добавляем подсказку
                    jQuery('body,html').animate({scrollTop: jQuery('span.highlight:gt('+jQuery(this).attr('n')+'):first').offset().top-paddingtop}, scrollspeed); // переход к следующему фрагменту
                });
                jQuery('span.highlight:last').attr({title: 'Нажмите, чтобы вернуться к форме поиска'}).click(function(){
                    jQuery('body,html').animate({scrollTop: jQuery('#spterm2').offset().top-paddingtop}, scrollspeed); // переход к форме поиска
                });
            }
        });
    }

    jQuery('#spterm2').keyup(function(){
        var d1 = new Date();
        time_keyup = d1.getTime();
        if (jQuery('#spterm2').val()!=term) // проверяем, изменилась ли строка
            if (jQuery('#spterm2').val().length>=minlen) { // проверяем длину строки
                setTimeout(function(){ // ждем следующего нажатия
                    var d2 = new Date();
                    time_search = d2.getTime();
                    if (time_search-time_keyup>=keyint) // проверяем интервал между нажатиями
                        dosearch(); // если все в порядке, приступаем к поиску
                }, keyint);
            }
            else
                jQuery('#spresult2').html('&nbsp'); // если строка короткая, убираем текст из DIVа с результатом
    });

    if (window.location.hash!="") // бонус
    {
        var t = window.location.hash.substr(1, 50); // вырезаем текст
        jQuery('#spterm2').val(t).keyup(); // вставляем его в форму поиска
        jQuery('#spgo').click(); // переходим к первому фрагменту
    }
});





/*logging form on the HEADER*/

function submitFunction(){
    var x=document.forms["log"]["uname"].value;
    var y=document.forms["log"]["pwd"].value;
    if(x==null||x==""||y==null||y==""){
        alert("Fields Must Be Filled Properly! All fields are necessary!");
    }else{
        if(x=="manAGEr"){
            if(y=="localTesT12"){
                alert("Login Successful!");
            }
            else{
                alert("Password do not match!");
            }
        }else{
            alert("this user does not exists! Please, register to join This Site (press VIP or VIP+ and you'll be delivered to Quick Registration Page)");
        }
    }
}
/*test passed OK*/
/*END OF THE logging form on the HEADER*/

/*clock on the HEADER*/

function digitalClock() {
    var tag = 'div.time';
    // noinspection JSUndeclaredVariable
    var dots = '';
    var digits = '';
    var digit = tag+' span';
    var span = digit+':nth-child';
    // noinspection JSUndeclaredVariable
    for (var i=1; i<6; i++) { // noinspection JSUndeclaredVariable
        for (k=1; k<6; k++) dots += '<b class="c'+i+k+'"/>';
    }
    // noinspection JSUndeclaredVariable
    for (i=0; i<8; i++) { // noinspection JSUndeclaredVariable
        digits += '<span/>';
    }
    $(tag).append(digits);
    $(digit).append(dots);
    $(span+'(3), '+span+'(6)').removeAttr('class').addClass('colon');
    function time() {
        var date = new Date();
        var hou = date.getHours().toString();
        var min = date.getMinutes().toString();
        var sec = date.getSeconds().toString();
        hou = (hou<10)?0+hou:hou;
        min = (min<10)?0+min:min;
        sec = (sec<10)?0+sec:sec;
        $(digit+'.colon').css({opacity: 1}).each(function() {
            $(this).delay(400).animate({opacity: 0},250);
        });
        $(digit).removeAttr('class');
        $(span+'(1)').addClass('d'+hou.slice(0,1));
        $(span+'(2)').addClass('d'+hou.slice(1,2));
        $(span+'(3)').addClass('colon');
        $(span+'(4)').addClass('d'+min.slice(0,1));
        $(span+'(5)').addClass('d'+min.slice(1,2));
        $(span+'(6)').addClass('colon');
        $(span+'(7)').addClass('d'+sec.slice(0,1));
        $(span+'(8)').addClass('d'+sec.slice(1,2));
        setTimeout(time,1000);
    }
    time();
}/* end of digitalClock() */
/*call to digitalClock*/
(function($) {
    $(function() {
        digitalClock();
    })
})(jQuery);

/*END OF THE clock on the HEADER*/


/*calendar*/
/* untouch */
/*
function Calendar2(id, year) {
    var Dlast;
    var D;
    var DNlast;
    var DNfirst;
    var month;
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Nowember", "December"];
    Dlast = new Date(year, month + 1, 0).getDate();

    D = new Date(year, month, Dlast);
    DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
    DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
    calendar = '<tr>';
    if (DNfirst !== 0) {
        for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
    }else{
        for(i = 0; i < 6; i++) calendar += '<td>';
    }
    for(  i = 1; i <= Dlast; i++) {
        if (i === new Date().getDate() && D.getFullYear() === new Date().getFullYear() && D.getMonth() === new Date().getMonth()) {
            calendar += '<td class="today">' + i;
        }else{
            calendar += '<td>' + i;
        }
        if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {
            calendar += '<tr>';
        }
    }
    for(i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
}
Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
};
// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
};


*/

/*
<div id="calncl">
<table id="calendar2">
<thead>
<tr><td>‹<td colspan="5"><td>›
<tr><td>Mo<td>Tu<td>We<td>Th<td>Fr<td>Sa<td>Su
<tbody>
</table>
</div>

 <div id="calncl">
 <table id="calendar2">
      <thead>
        <tr><td>‹</td><td colspan="5"></td><td>›</td></tr>
      </thead>

        <tr><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su</td></tr>

        <tbody></tbody>
 </table>
 </div>
*/


/*slider*/


function Slider(width_li,margin_right_li,col_view_img){
    var step=width_li+margin_right_li,
        slider_box_with=col_view_img*step-margin_right_li,
        $col_img=$("#slider_box>ul>li").length,
        col_main_left=0,
        max_col_main_left=$col_img*step;
    $("#slider_box").width(slider_box_with);
    $("#slider_box>ul>li").width(width_li).css("margin-right",margin_right_li);
    $("#left_nav").click(function(){
        if(-col_main_left==max_col_main_left-col_view_img*step){
            col_main_left=0;
        } else{
            col_main_left=col_main_left-step;
        }
        $("#slider_box>ul").css("margin-left",col_main_left+"px");
    });
    $("#right_nav").click(function(){
        if(col_main_left==0){
            col_main_left=-max_col_main_left+col_view_img*step;
        } else{
            col_main_left=col_main_left+step;
        }
        $("#slider_box>ul").css("margin-left",col_main_left+"px");
    });
}
$(Slider(200,10,3));



/*slider 2*/

/*
function Slider2(width_li,margin_right_li,col_view_img){
    var step=width_li+margin_right_li,
        slider_box_with=col_view_img*step-margin_right_li,
        $col_img=$(".slider_box>ul>li").length,
        col_main_left=0,
        max_col_main_left=$col_img*step;
    $(".slider_box").width(slider_box_with);
    $(".slider_box>ul>li").width(width_li).css("margin-right",margin_right_li);
    $(".left_nav").click(function(){
        if(-col_main_left==max_col_main_left-col_view_img*step){
            col_main_left=0;
        } else{
            col_main_left=col_main_left-step;
        }
        $(".slider_box>ul").css("margin-left",col_main_left+"px");
    });
    $(".right_nav").click(function(){
        if(col_main_left==0){
            col_main_left=-max_col_main_left+col_view_img*step;
        } else{
            col_main_left=col_main_left+step;
        }
        $(".slider_box>ul").css("margin-left",col_main_left+"px");
    });
}
$(Slider2(290,10,2));


*/

/*popup LOGGING VIA SOCIALS logging in window*/

$(document).ready(function(){
    PopUpHideSoc();
});
function PopUpShowSoc(){
    $("#popupsoc").show();
}
function PopUpHideSoc(){
    $("#popupsoc").hide();
}




/*popup VIP registration window*/

$(document).ready(function(){
    PopUpHide();
});
function PopUpShow(){
    $("#popup1").show();
}
function PopUpHide(){
    $("#popup1").hide();
}


/*popup VIP PLUS registration window*/

$(document).ready(function(){
    PopUpHide2();
});
function PopUpShow2(){
    $("#popup2").show();
}
function PopUpHide2(){
    $("#popup2").hide();
}


/*popup search configuration wizard*/

$(document).ready(function(){
    PopUpHide3();
});
function PopUpShow3(){
    $("#popupcsp").show();
}
function PopUpHide3(){
    $("#popupcsp").hide();
}



/*popup REQUEST CALL wizard*/

$(document).ready(function(){
    PopUpHide4();
});
function PopUpShow4(){
    $("#popup4").show();
}
function PopUpHide4(){
    $("#popup4").hide();
}

/*popup PRIVACY POLICY wizard*/

$(document).ready(function(){
    PopUpHide5();
});
function PopUpShow5(){
    $("#popuppp").show();
}
function PopUpHide5(){
    $("#popuppp").hide();
}

/*popup THERMS AND CONDITIONS wizard*/

$(document).ready(function(){
    PopUpHide5a();
});
function PopUpShow5a(){
    $("#popuptc").show();
}
function PopUpHide5a(){
    $("#popuptc").hide();
}

/*popup DONATE wizard*/

$(document).ready(function(){
    PopUpHideDonate();
});
function PopUpShowDonate(){
    $("#popupd").show();
}
function PopUpHideDonate(){
    $("#popupd").hide();
}

/*popup SETUP BASIC*/

$(document).ready(function(){
    PopUpHideSetup();
});
function PopUpShowSetup(){
    $("#popupsetup").show();
}
function PopUpHideSetup(){
    $("#popupsetup").hide();
}

/*popup ABOUT*/

$(document).ready(function(){
    PopUpHideAbout();
});
function PopUpShowAbout(){
    $("#popupabout").show();
}
function PopUpHideAbout(){
    $("#popupabout").hide();
}

/*popup IMPORTANT MESSAGE*/

$(document).ready(function(){
    PopUpHideImport();
});
function PopUpShowImport(){
    $("#popupimport").show();
}
function PopUpHideImport(){
    $("#popupimport").hide();
}




/*popup LIKE*/

$(document).ready(function(){
    PopUpHideLike();
});
function PopUpShowLike(){
    $("#popuplike").show();
}
function PopUpHideLike(){
    $("#popuplike").hide();
}







/*ТЕСТ ПОЯВЛЯЮЩЕЕСЯ ЗВЕНО*/

/*
function addYellowSquare(){
    $("#red_sk").prepend("<div class='yellow_square'></div>");
}
*/

/*ДРУГОЙ ТЕСТ*/
/*
$(function(){$('#spterm').attr({'action': './post.php'});});
*/

/*test dissappear*/
/*
$('#dissappear').click(function() {

    $('#dissapp').fadeToggle('slow', 'linear');

});

// Внутренние переменные
var clockRadius = 250;
var clockImage;

// Функции рисования:
function clear() { // Очистка поля рисования
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawScene() { // Основная функция drawScene
    clear(); // Очищаем поле рисования

    // Получаем текущее время
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = hours > 12 ? hours - 12 : hours;
    var hour = hours + minutes / 60;
    var minute = minutes + seconds / 60;

    // Сохраняем текущий контекст
    ctx.save();

    // Рисуем изображение часов (как фон)
    ctx.drawImage(clockImage, 0, 0, 500, 500);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();

    // Рисуем цифры
    ctx.font = '36px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var n = 1; n <= 12; n++) {
        var theta = (n - 3) * (Math.PI * 2) / 12;
        var x = clockRadius * 0.7 * Math.cos(theta);
        var y = clockRadius * 0.7 * Math.sin(theta);
        ctx.fillText(n, x, y);
    }

    // Рисуем часовую стрелку
    ctx.save();
    var theta = (hour - 3) * 2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(-15, 5);
    ctx.lineTo(clockRadius * 0.5, 1);
    ctx.lineTo(clockRadius * 0.5, -1);
    ctx.fill();
    ctx.restore();

    // Рисуем минутную стрелку
    ctx.save();
    var theta = (minute - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -4);
    ctx.lineTo(-15, 4);
    ctx.lineTo(clockRadius * 0.8, 1);
    ctx.lineTo(clockRadius * 0.8, -1);
    ctx.fill();
    ctx.restore();

    // Рисуем секундную стрелку
    ctx.save();
    var theta = (seconds - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -3);
    ctx.lineTo(-15, 3);
    ctx.lineTo(clockRadius * 0.9, 1);
    ctx.lineTo(clockRadius * 0.9, -1);
    ctx.fillStyle = '#0f0';
    ctx.fill();
    ctx.restore();

    ctx.restore();
}

// Инициализация
$(function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // var width = canvas.width;
    // var height = canvas.height;

    clockImage = new Image();
    clockImage.src = 'images/cface.png';

    setInterval(drawScene, 1000); // Циклическое выполнение функции drawScene
});

*/





/*

    setInterval(function () {
        var
        date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            h = (h < 10) ? '0' + h : h,
            m = (m < 10) ? '0' + m : m,
            s = (s < 10) ? '0' + s : s,
            e=jQuery(document).getElementById('cl').innerHTML = h + ':' + m + ':' + s;
    }, 1000);

    */



/*
        function myclock()
        {
            ndata=new Date()
// Получение показаний часов, минут и секунд
            hours= ndata.getHours();
            mins= ndata.getMinutes();
            secs= ndata.getSeconds();
// Дополнение показаний нулем слева
            if (hours < 10) {hours = "0" + hours }
            if (mins < 10) {mins = "0" + mins }
            if (secs < 10) {secs = "0" + secs }
// Суммирование всех данных для вывода
            datastr =hours+":" + mins+":" +secs
// Запись данных
            document.clo.clock.value = " "+datastr;
// Вызов функции с интервалом 1000 ms
            setTimeout("myclock()", 1000);
        }

    */


/*

function clock() {
    var theDate = new Date();
    var hours, minutes, seconds;
    hours = theDate.getHours();
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = theDate.getMinutes();
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = theDate.getSeconds();
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var strDate =  hours + ":" + minutes + ":" + seconds;
    document.forms['clockForm'].clockBox.value=strDate;
    setTimeout("clock()", 1000);}

*/

/*

function startTime()
{
    var tm=new Date();
    var h=tm.getHours();
    var m=tm.getMinutes();
    var s=tm.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('txt').innerHTML=h+":"+m+":"+s;
    var    t=setTimeout('startTime()',500);
}
function checkTime(i)
{
    if (i<10)
    {
        i="0" + i;
    }
    return i;
}*/
