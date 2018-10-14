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
    document.getElementById("lphref").style.display = "block";
});

// Logs the user out
function logout() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        // addGoodMessage("Logged Out Successfully");
        window.location.href = '../index.html#logout'
    }, function(error) {
        console.error('Sign Out Error', error);
        
    });
}

var db;
function initializeDatabase() {
    // Initialize Cloud Firestore through Firebase
    db = firebase.firestore();

    // Disable deprecated features
    db.settings({
      timestampsInSnapshots: true
    });
}

function addSearchResultsToDatabase(dateTime, keyword, graphResponse, searchResponse) {
    var user = db.collection("users").doc(firebase.auth().currentUser);
    
    user.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var userData = doc.data();
            userData.dateTime.unshift(dateTime);
            userData.keyword.unshift(keyword);
            db.collection("users").doc(firebase.auth().currentUser).set({
                dateTime: userData.dateTime,
                keyword: userData.keyword
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        } else {
            db.collection("users").doc(firebase.auth().currentUser).set({
                dateTime: [dateTime],
                keyword: [keyword]
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
    var dataID = firebase.auth().currentUser + "-" + dateTime;
    db.collection("results").doc(dataID).set({
        graphData: graphResponse,
        searchData: searchResponse
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    
    return dataID;
}