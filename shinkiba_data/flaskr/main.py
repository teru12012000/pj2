from lxml import html
import requests
from flaskr import app
from flask import render_template
@app.route('/')
def index():
  URL='https://www.di-ksp.jp/facility/yumenoshima_k/schedule'
  data=requests.get(URL)
  html1=html.fromstring(data.text)
  date=html1.xpath('//*[@id="schedule"]/div/section/table/tbody/tr[1]/td')
  table1=html1.xpath('//*[@id="schedule"]/div/section/table/tbody/tr[2]/td')
  table2=html1.xpath('//*[@id="schedule"]/div/section/table/tbody/tr[3]/td')
  table3=html1.xpath('//*[@id="schedule"]/div/section/table/tbody/tr[4]/td')
  table4=html1.xpath('//*[@id="schedule"]/div/section/table/tbody/tr[5]/td')
  table5=html1.xpath('//*[@id="schedule"]/div/section/table/tbody/tr[6]/td')
  return render_template(
    'index.html',
    date=date,
    table1=table1,
    table2=table2,
    table3=table3,
    table4=table4,
    table5=table5,
  )
