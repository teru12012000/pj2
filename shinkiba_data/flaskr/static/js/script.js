day=[
  '日',
  '月',
  '火',
  '水',
  '木',
  '金',
  '土',
]

$date=document.getElementsByClassName('date');
var today=new Date();
var getsumatu=new Date(today.getFullYear(),today.getMonth()+1,0)
const dateleng=$date.length;
var plus=0
for(var i=0;i<dateleng;i++){
  $date[i].textContent=`${today.getMonth()+plus+1}/${today.getDate()+i}(${day[(today.getDay()+i)%7]})`
  if(getsumatu.getDate()==today.getDate()){
    plus=1
  }
}
