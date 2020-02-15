var firebase = app_fireBase;
const db = firebase.database();
const users = db.ref("/users");
let userEmail = "";

function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            userEmail = user.email;
            console.log("user is signed in")
            
        }else{
            //redirect to login page
            window.location.replace("login.html");
            console.log("redirect to login page")
        }
      });
      document.getElementById("setClient").addEventListener('click', setUserTypeClient);
      document.getElementById("setPro").addEventListener('click', setUserTypePro);
}

function setUserTypeClient() {
    const data = {
        userEmail,
        type: "client",
        events: []
    }
    users.push(data);
    window.location.replace("index.html");
}

function setUserTypePro() { 
    const data = {
        userEmail,
        type: "pro",
        events: []
    }
    users.push(data);
    window.location.replace("indexPro.html");
}

document.addEventListener('DOMContentLoaded',init);
