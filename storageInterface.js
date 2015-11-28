function getWhitelist(callback) 
{
    chrome.runtime.sendMessage({method: "getWhitelist"}, function(response) {
        if(typeof(response.hosts)!=="undefined") {
            callback(response.hosts);
        }
    });
}

function addToWhitelist(hostname) 
{
    if(typeof(hostname) !== "undefined") {
        chrome.runtime.sendMessage({method: "addToWhitelist", host: hostname});
    }
}

function removeFromWhitelist(host) 
{
    
}

function addExternalSite(hostname)
{
    if(typeof(hostname) !== "undefined") {
        chrome.runtime.sendMessage({method: "addExternalSite", host: hostname});
    }
}

function getExternalSites(callback)
{
    chrome.runtime.sendMessage({method: "getExternalSites"}, function(response) {
        if(typeof(response.hosts)!=="undefined") {
            callback(response.hosts);
        }
    });
}

function clearCurrentSites()
{
    chrome.runtime.sendMessage({method: "clearCurrent"});
}