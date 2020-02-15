document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    const config = {
      plugins: [ 'list' ],
      timeZone: 'UTC',
      defaultView: 'listMonth',
      height: 600,
      events: []
    }
    var calendar = new FullCalendar.Calendar(calendarEl, config);
    document.getElementById('update-schedule').addEventListener('click', function(){ updateSchedule(calendar); });
  
    calendar.render();
  });

  function updateSchedule(config, calendar) {
    const eventName = document.getElementById('add-event').value;
    const eventTime = document.getElementById('event-time').value;
    const eventDate = document.getElementById('event-date').value;
    console.log(eventName)
    console.log(eventTime)
    console.log(eventDate)
    const newEvent =
    {
      title: eventName,
      start: eventDate+"T"+eventTime+":00",
    }
    calendar.addEvent(newEvent)
  }
