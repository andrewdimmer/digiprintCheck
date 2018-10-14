function loadIndex_html(url) {
    console.log(url);
    if (((url.indexOf("#") == -1) && (document.getElementById("lptext").innerHTML.indexOf("Login") > -1)) || (url.indexOf("#logout") > -1)) {
        document.getElementById("indexNav").style.display = "none";
        document.getElementById("bgContainer").classList.add("bgLogo");
        document.getElementById("welcome").style.display = "block";
        document.getElementById("content").style.display = "none";
        document.getElementsByTagName("footer")[0].style.display = "none";
        if (url.indexOf("#logout") > -1) {
            addGoodMessage("Logged Out Successfully");
        }
    } else {
        document.getElementById("indexNav").style.display = "flex";
        document.getElementById("bgContainer").classList.remove("bgLogo");
        document.getElementById("welcome").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.getElementsByTagName("footer")[0].style.display = "block";
        if (url.indexOf("#login") > -1) {
            addGoodMessage("Logged In Successfully");
        }
    }
}

function searchForResults() {
    setTimeout(function(){
        var href = "../loading.html?name=" + document.getElementById("firstName").value + "+" + document.getElementById("lastName").value;
        window.location.href = href;
    }, 500);
}

function displayPastResults() {
    var pastResults = getUserResultsList();
    
    if (pastResults == null) {
        document.getElementById("pastResults").innerHTML = "<p>No past results found.</p>";
    } else {
        for (var i = 0; i < pastResults.dateTime.length; i++) {
            document.getElementById("pastResults").innerHTML += "<a class='big-button-dark' href='../analysis.html?data=" + firebase.auth().currentUser.uid + "-" + pastResults.dateTime[i] + "><h4>Searched for \"" + pastResults.keyword[i] + "\" on " + pastResults.dateTime[i] + "</h4></a>";
        }
    }
}