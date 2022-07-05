//日付の取得
const date=new Date();

//ドキュメントの取得
let $mon=document.getElementById('js-month');
let $table=document.getElementsByClassName('text');
let $date=document.getElementsByClassName('a-cal');
let $day=document.getElementsByClassName('cal_day');
let $before_month=document.getElementById('before-month');
let $after_month=document.getElementById('after-month');


//各ドキュメントの長さ
const table_length=$table.length;
const date_length=$date.length;

let month=date.getMonth()+1;
let year=date.getFullYear();
const calcuate=(monthlen,firstday)=>{
  $mon.textContent=`${year}年　${month}月`;
  //曜日の色付け
  $day[0].style.color='red';
  $day[6].style.color='blue';
  
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
}
//初期化
const init=()=>{
  const start=new Date(year,month-1,1);
  const end=new Date(year,month,0);
  //月の記載
  const monthlen=end.getDate();
  const firstday=start.getDay();
  calcuate(monthlen,firstday);
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
const clear_table=(firstday,sum_date)=>{
  for(i=0;i<firstday;i++){
    $date[i].textContent='';
  }
  for(i=date_length-1;i>=date_length-sum_date-1;i--){
    $date[i].textContent='';
  }
}
//前の日にちをクリックされた際の処理
const bm=()=>{
  month-=1;
  if(month==0){
    month=12;
  }
  if(month==12){
     year-=1;
  }
  const start=new Date(year,month-1,1);
  const end=new Date(year,month,0);
  const monthlen=end.getDate();
  const firstday=start.getDay();
  const sum_date=monthlen+firstday;
  clear_table(firstday,sum_date);
  calcuate(monthlen,firstday);
}
//次の日付をクリックしたとき
const am=()=>{
  month+=1;
  if(month==13){
    month=1;
  }
  if(month==1){
     year+=1;
  }
  const start=new Date(year,month-1,1);
  const end=new Date(year,month,0);
  const monthlen=end.getDate();
  const firstday=start.getDay();
  const sum_date=monthlen+firstday;
  clear_table(firstday,sum_date);
  calcuate(monthlen,firstday);
}

//初期化呼び出し
init();
//日にちをクリック
for(i=0;i<date_length;i++){
  $date[i].addEventListener('click',(e)=>clickEvent(e));
}
//前の月のボタンをクリック
$before_month.addEventListener('click',()=>bm());
$after_month.addEventListener('click',()=>am());

