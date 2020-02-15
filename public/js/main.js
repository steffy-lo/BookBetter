var firebase = app_fireBase;
let email = "";
let name = "";
const userName = document.getElementById("user-name");
const db = firebase.database();

function init(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in. Get their name.
      name = user.displayName;
      email = user.email;
      userName.innerHTML = "Welcome, " + name + "!";
    }else{
        //redirect to login page
        window.location.replace("login.html");
    }
  });
  document.getElementById('log-out').addEventListener('click', logOut);
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {

        console.error(error);
      });
}

document.addEventListener('DOMContentLoaded',init);

