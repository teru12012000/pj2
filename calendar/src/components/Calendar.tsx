import React,{useCallback, useState} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import '../App.css'
type eve={
  title:string;
  date:string;
}


function Calendar() {
  const [event,setEvent]=useState<eve[]>([])

  const handleClick=useCallback((arg: DateClickArg) => {
    //alert(arg.dateStr);
  }, []);
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin,interactionPlugin]} // 追加
        initialView="dayGridMonth"
        locales={[jaLocale]}         // 追加
        locale='ja'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek listWeek', // 追加
        }}
        dateClick={handleClick}
      />
    </div>
  )
}
export default Calendar