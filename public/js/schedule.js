//load pro's scheduled appointments

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
      selectable: true,
      defaultView: 'timeGridWeek',
      nowIndicator: true,
      minTime: '8:00',
      maxTime: '18:00',
      height: 600,
      //load data
    });
  
    calendar.render();
  });