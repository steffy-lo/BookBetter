var firebase = app_fireBase;
var name = "";

function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in. Get their name and email.
        name = user.displayName;
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

//Update settings
function saveSettings(){
    var user = firebase.auth().currentUser;

    //New Password settings - update only if current Password is correct and user is reauthenticated
    const newPassword = document.getElementById("inputPassword6");
    const password =  document.getElementById("inputPassword");
    if(newPassword.value.trim() && password.value.trim()){
        reauthenticate(password.value).then(()=>{
            user.updatePassword(newPassword.value).then(function() {
                document.getElementById("passwordCurrent").innerHTML = "";
                document.getElementById("passwordHelpInline").innerHTML ="<b>New password SAVED!</b>";
                newPassword.value = "";
                password.value = "";
              }).catch(function(error) {
                document.getElementById("passwordCurrent").innerHTML = "Current password OK.";
                  document.getElementById("passwordHelpInline").innerHTML = error;
            });
        }).catch(function(error) {
            document.getElementById("passwordCurrent").innerHTML = error;
        });
    }
}

//Reauthenticate to update password
function reauthenticate(password){
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
}

document.addEventListener('DOMContentLoaded',init);
