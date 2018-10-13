//Profile page Firebase functions
function getInfo(user) {
    if (user != null) {
        console.log("Display user profile information");
        document.getElementById("userName").innerHTML = user.displayName;
        document.getElementById("newName").value = user.displayName;
        document.getElementById("userEmail").innerHTML = user.email;
        document.getElementById("newEmail").value = user.email;
        document.getElementById("userPassword").innerHTML = "********";
    } else {
        // Error handling
        console.log("No user logged in");
        document.getElementById("userName").innerHTML = "";
        document.getElementById("newName").value = "";
        document.getElementById("userEmail").innerHTML = "";
        document.getElementById("newEmail").value = "";
        document.getElementById("userPassword").innerHTML = "";
    }
}

function updateName() {
    var user = firebase.auth().currentUser;
    var newName = document.getElementById("newName").value;

    user.updateProfile({
        displayName: newName,
    }).then(function() {
        // Update successful.
        toggleEditName();
    }).catch(function(error) {
        // An error happened.
    });
}

function updateEmail() {
    var user = firebase.auth().currentUser;
    var newEmail = document.getElementById("newEmail").value;

    user.updateEmail(newEmail).then(function() {
        // Update successful.
        toggleEditEmail();
    }).catch(function(error) {
        // An error happened.
    });
}

function updatePassword() {
    var user = firebase.auth().currentUser;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword == confirmPassword) {
        user.updatePassword(newPassword).then(function() {
            // Update successful.
            toggleEditPassword();
        }).catch(function(error) {
            // An error happened.
        });
    } else {
        // Mismatch Passwords
    }
}

//Profile page display functions
function toggleEditName() {
    if (document.getElementById("editNameForm").style.display == "none") {
        document.getElementById("editNameForm").style.display = "";
        document.getElementById("editNameIcon").style.display = "none";
        document.getElementById("userName").style.display = "none";
    } else {
        document.getElementById("editNameForm").style.display = "none";
        document.getElementById("editNameIcon").style.display = "";
        document.getElementById("userName").style.display = ""; 
    }
}

function toggleEditEmail() {
    if (document.getElementById("editEmailForm").style.display == "none") {
        document.getElementById("editEmailForm").style.display = "";
        document.getElementById("editEmailIcon").style.display = "none";
        document.getElementById("userEmail").style.display = "none";
    } else {
        document.getElementById("editEmailForm").style.display = "none";
        document.getElementById("editEmailIcon").style.display = "";
        document.getElementById("userEmail").style.display = ""; 
    }
}

function toggleEditPassword() {
    if (document.getElementById("editPasswordForm").style.display == "none") {
        document.getElementById("editPasswordForm").style.display = "";
        document.getElementById("editPasswordIcon").style.display = "none";
        document.getElementById("userPassword").style.display = "none";
    } else {
        document.getElementById("editPasswordForm").style.display = "none";
        document.getElementById("editPasswordIcon").style.display = "";
        document.getElementById("userPassword").style.display = ""; 
    }
}