from lxml import html
import requests
URL='https://www.di-ksp.jp/facility/yumenoshima_k/schedule'
data=requests.get(URL)
html=html.fromstring(data.text)

table1=html.xpath('//*[@id="schedule"]/div/section/table/tbody/tr[2]/td')
#//*[@id="schedule"]/div/section/table/tbody/tr[2]/td[2]


print(table1[1].text)
print(table1[3].text)
print(table1[5].text)