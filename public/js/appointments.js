
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
    select: function(info) {
      info.startStr = calendar.formatDate(info.start, {hour:'numeric',minute:'2-digit'});
      info.endStr = calendar.formatDate(info.end, {hour:'numeric',minute:'2-digit'});
      alert('Book Appointment from '+ info.startStr+' to '+info.endStr+'?');
      const event={
        title: 'Appointment',
        start: info.start,
        end: info.end
      }
      calendar.addEvent(event);
      pushEventToDb(event);
    },  
  });

  calendar.render();
});

function pushEventToDb(event){

  //Add event to user's db
  const email = firebase.auth().currentUser.email
    firebase.database().ref("/users").once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        if (value.userEmail === email) {
          var eventRef = db.ref("/users/"+childSnapshot.key.toString()+"/events")
            eventRef.push(event)
            //value.events.push(event);
            console.log(value);
        }
      });
    });

  //Add event to pro's db
}

