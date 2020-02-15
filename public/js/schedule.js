//load pro's scheduled appointments

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    const config = {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
      selectable: true,
      defaultView: 'timeGridWeek',
      nowIndicator: true,
      minTime: '8:00',
      maxTime: '18:00',
      height: 600,
      events: []
    }
    var calendar = new FullCalendar.Calendar(calendarEl, config);
    calendar.render();
    setTimeout(function() { populateCalendar(calendar); }, 1000);

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