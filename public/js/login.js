var firebase = app_fireBase;
let redirectPage = "chooseType.html";
let email = "";

(function(){
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            const email = authResult.user.email
            firebase.database().ref("/users").once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                var value = childSnapshot.val();
                console.log(value)
                if (value.userEmail === email) {
                    // user already exists in the database
                    console.log("user already in database")
                    if (value.type === "client") {
                        redirectPage = "index.html";
                        
                    }
                    else {
                        redirectPage = "indexPro.html";
                        return true;
                    }
                }
                });
                window.location.replace(redirectPage);
            });
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'index.html',
        // Privacy policy url.
        privacyPolicyUrl: 'index.html'
      };

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
})()
