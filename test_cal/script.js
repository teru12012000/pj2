const date=new Date();
const year=date.getFullYear();
const month=date.getMonth()+1;
const start=new Date(year,month-1,1);
const end=new Date(year,month,0);

const monthlen=end.getDate();
const firstday=start.getDay();
let $mon=document.getElementById('js-month');
$mon.textContent=month+ '月';

let $day=document.getElementsByClassName('cal_day');
$day[0].style.color='red';
$day[6].style.color='blue';

let $date=document.getElementsByClassName('a-cal');

for(i=0;i<monthlen;i++){
  $date[firstday+i].textContent=i+1;
  if((firstday+i)%7==0){
    $date[firstday+i].style.color='red';
  }
  if((firstday+i)%7==6){
    $date[firstday+i].style.color='blue';
  }
  if((firstday+i)%7!=6&&(firstday+i)%7!=0){
    $date[firstday+i].style.color='black';
  }
}
console.log(monthlen)