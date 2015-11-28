getWhitelist(function(whitelist) {

    function addSiteHtml(elem) {
        var p = $("<p></p>");
        p.append(elem);
        if (whitelist.indexOf(elem) < 0) {
            var b = $('<input type="button" value="new button"/>');
            b.click(function() {
                addToWhitelist(elem);
            });
            p.append(b);
        }
        $("#siteContainer").append(p);
    }

    getExternalSites(function(sites) {
        sites.forEach(addSiteHtml);
    });
    
});