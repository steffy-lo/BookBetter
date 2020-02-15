
const users = db.ref("/users");

function init(){
    let contacts = [];
    const contactsMenu = document.getElementById('select-prof');
    while (contactsMenu.firstChild) {
        contactsMenu.removeChild(contactsMenu.firstChild);
    }
    users.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var value = childSnapshot.val();
            if (value.userEmail === firebase.auth().currentUser.email) {
                contacts = value.contacts;
                Object.keys(contacts).forEach(key => {
                    const option = document.createElement("option"); //create a new row for each row
                    option.textContent = contacts[key].name;
                    contactsMenu.appendChild(option); //append each cell to the row
                })
            }
        });
    });
}

document.addEventListener('DOMContentLoaded',init);