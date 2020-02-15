document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'list' ],
      timeZone: 'UTC',
      defaultView: 'listMonth',
      height: 600,
      events: 'https://fullcalendar.io/demo-events.json'
    });
  
    calendar.render();
  });