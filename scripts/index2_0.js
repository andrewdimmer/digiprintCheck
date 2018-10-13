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