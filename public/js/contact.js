var firebase = app_fireBase;
const db = firebase.database();
const users = db.ref("/users");

function init() {
    document.getElementById('addNewContact').addEventListener('click', addContact);
    populateTable();
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

function addContact() {
    const contactName = document.getElementById("contactName").value;
	const contactEmail = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNum").value;
    users.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        if (value.userEmail === firebase.auth().currentUser.email) {
            const contact={
                name: contactName,
                email: contactEmail,
                phone: phoneNumber
            }
            let exists = false;
            var contactRef = db.ref("/users/"+childSnapshot.key.toString()+"/contacts")
            contactRef.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                var value = childSnapshot.val();
                if (value.email == contactEmail) {
                    // Contact already exists!
                    exists = true;
                    alert("Contact already exists!");
                    console.log("contact already exists!")
                }
                })
                if (!exists) {
                    contactRef.push(contact);
                    populateTable();
                }
            })
        }
        });
    });
    
}

function populateTable() {
    let contacts = [];
    const contactsTable = document.querySelector('#contact-data');
    while (contactsTable.firstChild) {
        contactsTable.removeChild(contactsTable.firstChild);
    }
    users.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var value = childSnapshot.val();
        if (value.userEmail === firebase.auth().currentUser.email) {
            contacts = value.contacts
            console.log(contacts)
            Object.keys(contacts).forEach(key => {
                const tr = document.createElement("tr"); //create a new row for each row
                const td1 = document.createElement("td"); //create a new cell
                td1.textContent = contacts[key].name;
                tr.appendChild(td1); //append each cell to the row
                const td2 = document.createElement("td"); //create a new cell
                td2.textContent = contacts[key].email;
                tr.appendChild(td2); //append each cell to the row
                const td3 = document.createElement("td"); //create a new cell
                td3.textContent = contacts[key].phone;
                tr.appendChild(td3); //append each cell to the row
                contactsTable.appendChild(tr);
            })

        }
        });
    });
}

document.addEventListener('DOMContentLoaded',init);