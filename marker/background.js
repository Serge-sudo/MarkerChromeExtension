
chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.executeScript(tab.id, {
        file: "jquery.min.js"
    }, function() {
    	chrome.tabs.executeScript(tab.id, {
        file: "html2canvas.min.js"
    },function(){
        chrome.tabs.executeScript(tab.id, {
        file: "promise-done-7.0.4.min.js"
    }, function() {
        if (chrome.runtime.lastError) {
            alert("Page Marker doesn't support new tab pages or the Chrome Web Store because they are reserved by Chrome. Please try again on another page!");
        } else {
          chrome.tabs.executeScript(null, { file: "marker.js" }, function() {})
        }
    });
});
});
});


