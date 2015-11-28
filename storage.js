function putStorage(key, val) {
    localStorage.setItem(key,JSON.stringify(val));
}
function getStorage(key) {
    var d = localStorage.getItem(key);
    return JSON.parse(d);
}
function clearStorage(key) {
    localStorage.removeItem(key);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    if (request.method == "clearCurrent") {
        clearStorage("currentExternalSites");
        sendResponse({});
    } else if (request.method == "addExternalSite") {
        var data = getStorage("currentExternalSites");   
        if(data == null) {
            data = [];
        }      
        if(data.indexOf(request.host) < 0) {
            data.push(request.host);
            putStorage("currentExternalSites", data);
        }
    } else if (request.method == "getExternalSites") {
        var data = getStorage("currentExternalSites");
        if(data === null) {
            data = [];
        }
        sendResponse({hosts: data});
    } else if (request.method == "getWhitelist") {
        var data = getStorage("whitelist");
        if(data === null) {
            data = [];
        }
        sendResponse({hosts: data});
    } else if (request.method == "addToWhitelist") {
        var data = getStorage("whitelist");   
        if(data == null) {
            data = [];
        }      
        if(data.indexOf(request.host) < 0) {
            data.push(request.host);
            putStorage("whitelist", data);
        }
    }
});