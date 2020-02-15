var firebase = app_fireBase;
const db = firebase.database();
const users = db.ref("/users");
let userEmail = "";

function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            userEmail = user.email;
            
        }else{
            //redirect to login page
            window.location.replace("login.html");
        }
        console.log(users);
      });
      document.getElementById("setClient").addEventListener('click', setUserTypeClient);
      document.getElementById("setPro").addEventListener('click', setUserTypePro);
}

function setUserTypeClient() {
    const data = {
        userEmail,
        type: "client"
    }
    users.push(data);
    window.location.replace("index.html");
}

function setUserTypePro(email) { 
    const data = {
        userEmail,
        type: "pro"
    }
    users.push(data);
    window.location.replace("indexPro.html");
}

document.addEventListener('DOMContentLoaded',init);
