function calendarBig(year) {
for (var m = 0; m <= 11; m++) {
var D = new Date(year,[m],1),
    Dlast = new Date(D.getFullYear(),D.getMonth()+1,0).getDate(),
    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
    calendar = '<tr>';

if (DNfirst != 0) {
  for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
}else{
  for(var  i = 0; i < 6; i++) calendar += '<td>';
}

for(var  i = 1; i <= Dlast; i++) {
  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
    calendar += '<td class="today">' + i;
  }else{
    if (
        (i == 1 && D.getMonth() == 0 && ((D.getFullYear() > 1897 && D.getFullYear() < 1930) || D.getFullYear() > 1947)) ||
        (i == 2 && D.getMonth() == 0 && D.getFullYear() > 1992) ||
        ((i == 3 || i == 4 || i == 5 || i == 6 || i == 8) && D.getMonth() == 0 && D.getFullYear() > 2004) ||
        (i == 7 && D.getMonth() == 0 && D.getFullYear() > 1990) ||
        (i == 23 && D.getMonth() == 1 && D.getFullYear() > 2001) ||
        (i == 8 && D.getMonth() == 2 && D.getFullYear() > 1965) ||
        (i == 1 && D.getMonth() == 4 && D.getFullYear() > 1917) ||
        (i == 9 && D.getMonth() == 4 && D.getFullYear() > 1964) ||
        (i == 12 && D.getMonth() == 5 && D.getFullYear() > 1990) ||
        (i == 7 && D.getMonth() == 10 && (D.getFullYear() > 1926 && D.getFullYear() < 2005)) ||
        (i == 8 && D.getMonth() == 10 && (D.getFullYear() > 1926 && D.getFullYear() < 1992)) ||
        (i == 4 && D.getMonth() == 10 && D.getFullYear() > 2004)
       ) {
      calendar += '<td class="holiday">' + i;
    }else{
      calendar += '<td>' + i;
    }
  }
  if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
    calendar += '<tr>';
  }
}

if (DNlast != 0) {
  for(var  i = DNlast; i < 7; i++) calendar += '<td>';
}

document.querySelector('#calendarBig table[data-m="' + [m] + '"] tbody').innerHTML = calendar;
document.querySelector('#calendarBig > thead td:nth-child(2)').innerHTML = 'Календарь на ' + year + ' год';
document.querySelector('#calendarBig > thead td:nth-child(1)').innerHTML = 'Календарь на ' + parseFloat(parseFloat(year)-1) + ' год';
document.querySelector('#calendarBig > thead td:nth-child(3)').innerHTML = 'Календарь на ' + parseFloat(parseFloat(year)+1) + ' год';

// абзац создаёт сообщения
for (var k = 1; k <= document.querySelectorAll('#calendarTable div').length; k++) {
  var myD = document.querySelectorAll('#calendarBig table td'),
      my = document.querySelector('#calendarTable div:nth-child(' + [k] + ')');
  for (var i = 0; i < myD.length; i++) {
    if (my.dataset.yyyy) {
      if (myD[i].innerHTML == my.dataset.dd && myD[i].parentNode.parentNode.parentNode.dataset.m == (my.dataset.mm - 1) && year == my.dataset.yyyy) {
        myD[i].title = my.dataset.text;
        if (my.dataset.link) {
          myD[i].innerHTML = '<a href="' + my.dataset.link + '" target="_blank">' + myD[i].innerHTML + '</a>';
        }
      }
    }else{
      if (myD[i].innerHTML == my.dataset.dd && myD[i].parentNode.parentNode.parentNode.dataset.m == (my.dataset.mm - 1)) {
        myD[i].title = my.dataset.text;
        if (my.dataset.link) {
          myD[i].innerHTML = '<a href="' + my.dataset.link + '" target="_blank">' + myD[i].innerHTML + '</a>';
        }
      }
    }
  }
}

}}

calendarBig(new Date().getFullYear());
document.querySelector('#calendarBig > thead td:nth-child(1)').onclick = calendarBigG;
document.querySelector('#calendarBig > thead td:nth-child(3)').onclick = calendarBigG;
function calendarBigG() {calendarBig(this.innerHTML.replace(/[^\d]/gi, ''));}
