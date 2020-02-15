(function(){
    var firebase = app_fireBase;
    const db = firebase.database();
    const users = db.ref("/users"); //save in users folder in database
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    let urlRedirect = "";
    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            const userEmail = authResult.getUser().email
            for (let i = 0; i < users.length; i++) {
              if (users[i].email === userEmail) {
                if (users[i].type == "") {
                  urlRedirect = 'chooseType.html'
                }
                else if (users[i].type === "pro") {
                  urlRedirect = 'indexPro.html'

                } else { // type is client
                  urlRedirect = 'index.html'
                }
                break;
              }
            }
            const data = {
              userEmail,
              type: ""
            }
            users.push(data);
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: urlRedirect,
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
