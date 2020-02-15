document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    selectable: true,
    defaultView: 'timeGridWeek',
    nowIndicator: true,
    minTime: '8:00',
    maxTime: '18:00',
    select: function(info) {
      info.startStr = calendar.formatDate(info.start, {hour:'numeric',minute:'2-digit'});
      info.endStr = calendar.formatDate(info.end, {hour:'numeric',minute:'2-digit'});
      alert('Book Appointment from '+ info.startStr+' to '+info.endStr+'?');
      calendar.addEvent({
        title: 'Appointment',
        start: info.start,
        allDay: false
      });
    },  
  });

  calendar.render();
});