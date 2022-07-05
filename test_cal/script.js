const date=new Date();
const year=date.getFullYear();
const month=date.getMonth()+1;
const start=new Date(year,month-1,1);
const end=new Date(year,month,0);
//月の記載
const monthlen=end.getDate();
const firstday=start.getDay();
let $mon=document.getElementById('js-month');
$mon.textContent=month+ '月';
//曜日の色付け
let $day=document.getElementsByClassName('cal_day');
$day[0].style.color='red';
$day[6].style.color='blue';

let $table=document.getElementsByClassName('text');
let $date=document.getElementsByClassName('a-cal');
const table_length=$table.length;
//日にち記載
for(i=0;i<monthlen;i++){
  $date[firstday+i].textContent=(i+1);
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
//日にちクリック時のイベント
const clickEvent=(e)=>{
  e.preventDefault();
  const text=prompt('イベントを入力してください');
  for(i=0;i<table_length;i++){
    if($date[i].textContent==e.target.textContent){
      const body=`${text}<br>`
      if(text){
        $table[i].insertAdjacentHTML('beforeend',body);
      }
      break;
    }
  }
}
const date_length=$date.length;
for(i=0;i<date_length;i++){
  $date[i].addEventListener('click',(e)=>clickEvent(e));
}


