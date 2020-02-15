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
    setTimeout(function() { populateCalendar(config); }, 500);

});

function populateCalendar(config) {
  console.log(firebase.auth().currentUser);
  const email = firebase.auth().currentUser.email;
  firebase.database().ref("/users").once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        if (value.userEmail === email) {
          console.log(value)
        }
      });
    });
}