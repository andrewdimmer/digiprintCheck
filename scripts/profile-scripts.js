// Initialize Firebase
function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyDhkUAmeeh45jNFD_pGlgO7HH5o_wqhyKg",
        authDomain: "mhacks11-cgp.firebaseapp.com",
        databaseURL: "https://mhacks11-cgp.firebaseio.com",
        projectId: "mhacks11-cgp",
        storageBucket: "mhacks11-cgp.appspot.com",
        messagingSenderId: "82903113376"
    };
    firebase.initializeApp(config);
}

// Ensures that firebase is initialized on all pages
initializeFirebase();

//Profile page Firebase functions
function getInfo(user) {
    if (user != null) {
        console.log("Display user profile information");
        document.getElementById("userName").innerHTML = user.displayName;
        document.getElementById("userEmail").innerHTML = user.email;
        document.getElementById("userPassword").innerHTML = "********";
    } else {
        // Error handling
        console.log("No user logged in");
    }
}

function updateName() {
    var user = firebase.auth().currentUser;
    var newName = document.getElementById("newName").value;

    user.updateProfile({
        displayName: newName,
    }).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });
}

function updateEmail() {
    var user = firebase.auth().currentUser;
    var newEmail = document.getElementById("newEmail").value;

    user.updateEmail(newEmail).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });
}

function updatePassword() {
    var user = firebase.auth().currentUser;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    user.updatePassword(newPassword).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });
}