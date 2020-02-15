var firebase = app_fireBase;
const db = firebase.database();
const users = db.ref("/users");

function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const userEmail = user.email
            const data = {
                userEmail,
                type: ""
            }
            users.push(data);
        }else{
            //redirect to login page
            window.location.replace("login.html");
        }
      });
}

function setUserTypeClient() {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          users[i].type = "client"
          window.open("index.html");
          break;
        }
    }
}

function setUserTypePro() { 
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          users[i].type = "professional"
          window.open("indexPro.html");
          break;
        }
    }
}

document.addEventListener('DOMContentLoaded',init);
