var firebase = app_fireBase;
const db = firebase.database();
const users = db.ref("/users");

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
