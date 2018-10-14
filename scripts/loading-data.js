var rawResponses = [];

var graphResponse = {
    "category": [],
    "displayLink": [],
    "link": [],
    "snippet": [],
    "title": [],
};
var searchResponse = [];

function addItem(category, item) {
    graphResponse.category.push(category);
    graphResponse.displayLink.push(item.displayLink);
    graphResponse.link.push(item.link);
    graphResponse.snippet.push(item.snippet);
    graphResponse.title.push(item.title);
    
    searchResponse.push({
        "category": category,
        "displayLink": item.displayLink,
        "link": item.link,
        "snippet": item.snippet,
        "title": item.title,
    });
}

var count = 0;
function loadRawData(name) {
    var searchEngines = ["001891209431675038151:wuy4_v4u9lu","001891209431675038151:7fblgpchug4","001891209431675038151:rschrth36d8","001891209431675038151:5pmxudi0ci0","001891209431675038151:aecyhkupixa"];
    for (var i = 0; i < searchEngines.length; i++) {
        for(var j = 0; j < 5; j++) {
            var url = "https://www.googleapis.com/customsearch/v1?fields=items%28displayLink%2CfileFormat%2Clink%2Csnippet%2Ctitle%29&key=AIzaSyAqOtBOfmvwsspueM0240EhEP1SvhWswns&start=" + (j*10+1) + "&q=" + name + "&cx=" + searchEngines[i];
            var settings = {
                "async": true,
                "crossDomain": true,
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache",
                    "Postman-Token": "5a3d2335-b813-4edf-8ef9-cd356c27a5ab"
                }
            }

            $.ajax(url, settings).done(function (response) {
                rawResponses[count] = response;
                // console.log(count);
                if(count == (searchEngines.length*5)-1) {
                    populateItemsAndDatabase(name);
                }
                count++;
            });
        }
    }
}

function populateItemsAndDatabase(name) {
    for (var r = 0; r < rawResponses.length; r++) {
        console.log(r, rawResponses[r]);
        try {
            var DONOTUSE = rawResponses[r].items.length;
        } catch (err) {
            continue;
        }
        for (var c = 0; c < rawResponses[r].items.length; c++) {
            var item = rawResponses[r].items[c];
            if (r < 5) {
                // console.log("A " + r + ', ' + c);
                addItem("Technology", item);
            } else if (r < 10) {
                // console.log("B " + r + ', ' + c);
                addItem("Social", item);
            } else if (r < 15) {
                // console.log("C " + r + ', ' + c);
                addItem("Education", item);
            } else if (r < 20) {
                // console.log("D " + r + ', ' + c);
                addItem("Government", item);
            } else {
                // console.log("E " + r + ', ' + c);
                var alreadyExists = false;
                for (var j = 0; j < searchResponse.length; j++) {
                    if ((searchResponse[j].link.indexOf(item.link) > -1) && (item.link.indexOf(searchResponse[j].link) > -1)) {
                        alreadyExists = true;
                        break;
                    }
                }
                if (!alreadyExists) {
                    addItem("Government", item);
                }
            }
        }
    }
    var keyword = name.substring(0, name.indexOf("+")) + " " + name.substring(name.indexOf("+")+1, name.length);
    var dataIDPromise = addSearchResultsToDatabase((new Date()).toISOString(), keyword, graphResponse, searchResponse);
    dataIDPromise.then(function(dataID) {
        window.location.href = "../analysis.html?data=" + dataID;
    });
    
}