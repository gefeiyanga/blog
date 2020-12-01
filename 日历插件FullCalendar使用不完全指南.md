#### 业务需求
日历中需要展示日程任务，并且需要按照月、周、日视图查看。而antd提供的日组件只有年和月的视图切换，所以谷歌后选择了FullCalendar日历插件。这里展示最基本的react使用方法，官网 https://fullcalendar.io/ 提供了完整的vue、react、angular教程。

#### 代码
```
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";

...
  
  const renderEventContent = (eventInfo) => {
    return(
      <span
        onClick={() => {
          ...
        }}
      >
        {eventInfo.event._def.extendedProps.extraParams.xxxx}
      </span>
    )
  }

...

return <FullCalendar
  plugins={[ dayGridPlugin, timeGridPlugin ]}
  initialView="dayGridMonth"
  locale="cn"
  headerToolbar={{
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  }}
  eventContent={(e)=>renderEventContent(e)}
  events= {[
    ...dataSources
  ]}
/>
```

#### props说明
events: 需要一个数组，每个数组元素是一个对象，该对象以start为主键，extraParams属性可以在传递一个对象，渲染时，该对象放在eventInfo.event._def.extendedProps.extraParams中。

eventContent: 渲染函数，默认参数为每一次的eventInfo，有效参数放在eventInfo。
