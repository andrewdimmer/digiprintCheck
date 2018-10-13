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

// Checks if the user is logged in or not
// Displays the login link if they are not
// Displays the profile link if they are
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("User is logged in");
        document.getElementById("lptext").innerHTML = "Profile";
        document.getElementById("lphref").href = "../profile.html";
        document.getElementById("logout").style.display = "block";
    } else {
        console.log("User is not logged in");
        document.getElementById("lptext").innerHTML = "Login";
        document.getElementById("lphref").href = "../login.html";
        document.getElementById("logout").style.display = "none";
    }
});

// Logs the user out
function logout() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}