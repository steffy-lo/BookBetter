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
    setTimeout(function() { populateCalendar(calendar); }, 500);
  
    calendar.render();
  });

  function populateCalendar(calendar) {
    console.log(firebase.auth().currentUser);
    const email = firebase.auth().currentUser.email;
    firebase.database().ref("/users").once("value")
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
          const value = childSnapshot.val();
          if (value.userEmail === email) {
            console.log(value.events)
            for (var key in value.events) {
              const event = value.events[key];
              calendar.addEvent(event)
            }
          }
        });
      });
  }

  function updateSchedule(calendar) {
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
    pushEventToDb(newEvent);
  }

  function pushEventToDb(newEvent){
    //Add event to user's db
    console.log(firebase.auth().currentUser);
    const email = firebase.auth().currentUser.email
      firebase.database().ref("/users").once("value")
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
          var value = childSnapshot.val();
          if (value.userEmail === email) {
            var eventRef = db.ref("/users/"+childSnapshot.key.toString()+"/events")
              eventRef.push(newEvent)
          }
        });
      });
  }
