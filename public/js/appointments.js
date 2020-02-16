document.addEventListener('DOMContentLoaded', function() {
  const contactsMenu = document.getElementById('select-prof');

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
      const start = calendar.formatDate(info.start, {hour:'numeric',minute:'2-digit'});
      alert('Book Appointment at '+ start+ '?');
      const event={
        title: 'Appointment',
        start: info.startStr,
      }
      calendar.addEvent(event);
      pushEventToDb(event);
    }, 
    eventClick: function(info) {
      alert('Event: ' + info.event.title +" will be removed.");
      removeEvent(info.event.title);
      
    }
  });
  contactsMenu.addEventListener('change', function(){ displayCalendar(calendar); })

  calendar.render();
});

function populateCalendar(calendar, proEmail) {
  calendar.events = []
  console.log(proEmail)
  firebase.database().ref("/users").once("value")
  .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      const value = childSnapshot.val();
      if (value.userEmail === proEmail) {
        console.log(value.events)
        for (var key in value.events) {
          const event = value.events[key];
          event.title = "Occupied"
          calendar.addEvent(event)
        }
      }
    });
  });
}

function displayCalendar(calendar) {
  const contactsMenu = document.getElementById('select-prof');
  const proName = contactsMenu.options[contactsMenu.selectedIndex].value;
  firebase.database().ref("/users").once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        const value = childSnapshot.val();
        if (value.userEmail === email) {
          for (var key in value.contacts) {
            const contact = value.contacts[key].name
            if (contact === proName) {
              console.log(value.contacts[key].email)
              populateCalendar(calendar, value.contacts[key].email)
            }
          }
        }
      });
    });
}

function pushEventToDb(event) {
  const contactsMenu = document.getElementById('select-prof');
  const proName = contactsMenu.options[contactsMenu.selectedIndex].value;
  firebase.database().ref("/users").once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        const value = childSnapshot.val();
        if (value.userEmail === email) {
          for (var key in value.contacts) {
            const contact = value.contacts[key].name
            if (contact === proName) {
              console.log(value.contacts[key].email)
              pushToDb(event, value.contacts[key].email)
            }
          }
        }
      });
    });
}

function pushToDb(event, proEmail){

  //Add event to user's db
  console.log(proEmail)
  const email = firebase.auth().currentUser.email
    firebase.database().ref("/users").once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        if (value.userEmail === email) {
            const eventRef = db.ref("/users/"+childSnapshot.key.toString()+"/events")
            eventRef.push(event)
        }
        //Add event to pro's db
        if (value.userEmail === proEmail) {
            const eventRef = db.ref("/users/"+childSnapshot.key.toString()+"/events")
            eventRef.push(event)
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