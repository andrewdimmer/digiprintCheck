// Checks if the user is logged in or not
// Displays the login link if they are not
// Displays the profile link if they are
function isLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            document.getElementById("lptext").innerHTML = "Profile";
            document.getElementById("lphref").href = "../profile.html";
            document.getElementById("signout").style.display = "block";
        } else {
            document.getElementById("lptext").innerHTML = "Login";
            document.getElementById("lphref").href = "../login.html";
            document.getElementById("signout").style.display = "none";
        }
    });
}