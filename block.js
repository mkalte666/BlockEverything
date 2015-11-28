function extractDomain(url) {
    if(typeof(url)==="undefined") {
        return;
    }
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1 || url.indexOf("//") > -1) {
        domain = url.split('/')[2];
    } 
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

var elems = [];

function restoreCurrentSites()
{
    if(elems!==null) {
        elems.forEach(function(elem) {
            addExternalSite(elem);
        });
    }
}
function addExternalSiteAndSave(hostname) {
    if(elems.indexOf(hostname)<0) {
        elems.push(hostname);
        addExternalSite(hostname);
    }
}

function createPopup() {
    clearCurrentSites();
    restoreCurrentSites();       
}

function removeIfNeeded(elem, srcstr) 
    {
        var hostname = window.location.hostname; 
        var host = extractDomain(srcstr);   
        if (hostname != host) {
            addExternalSiteAndSave(host);
            getWhitelist(function(sites) {
                if (sites.indexOf(host)<0) {
                    elem.remove();
                }
            });
        }
    }




function setupHooks() {
    $("img").livequery(function () {
        removeIfNeeded($(this),$(this).attr("src"));  
    });
}
 

var curInterval = null;

$(window).on('focus', function() {
    curInterval = setInterval(createPopup,1000);
});

$(window).on('blur', function() {
    if(curInterval !== null) {
        clearInterval(curInterval);
        curInterval = null;
    }
});

setupHooks();
createPopup();