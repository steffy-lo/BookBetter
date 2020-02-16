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
      eventClick: function(info) {
        alert('Event: ' + info.event.title +" will be removed.");
        removeEvent(info.event.title);
        
      }
    }
    
    var calendar = new FullCalendar.Calendar(calendarEl, config);
    calendar.render();
    setTimeout(function() { populateCalendar(calendar); }, 1000);

});

function populateCalendar(calendar) {
  const email = firebase.auth().currentUser.email;
  firebase.database().ref("/users").once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        const value = childSnapshot.val();
        if (value.userEmail === email) {
          for (var key in value.events) {
            const event = value.events[key];
            calendar.addEvent(event)
          }
        }
      });
    });
}

function removeEvent(title){
  const email = firebase.auth().currentUser.email;
  firebase.database().ref("/users").once("value")
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
          var value = childSnapshot.val();
          if (value.userEmail === email) {
            var key1 = childSnapshot.key.toString();
            var eventRef = db.ref("/users/"+key1+"/events");
            console.log("/users/"+childSnapshot.key.toString()+"/events");
            eventRef.once("value")
            .then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var value = childSnapshot.val();
                if (value.title === title) {
                  db.ref("/users/"+key1+"/events/"+childSnapshot.key.toString()).remove();
                  console.log("/users/"+key1+"/events/"+childSnapshot.key.toString());
                  location.reload();
                }
              })
            })
          }
        })
      })
}

       
      
