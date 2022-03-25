
$(function() {
    chrome.tabs.getSelected(null, function(tab) {
        var lin;
        $("#subbtn").click(function() {
            $("#cop").css("display","none");
            lin = $("#link").val();
            if (!lin.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) {
                $("#plcforsl").html("ERROR : URL must be like http://google.com");
                $("#plcforsl").css("color", "red");
                return;
            }
            $.ajax({
                url: "https://api.rebrandly.com/v1/links",
                type: "post",
                data: JSON.stringify({
                    "destination": lin,
                    "domain": {
                        "fullName": "rebrand.ly"
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                    "apikey": "36ef6cce73ad4c6c997d252afa4e356c"
                },
                dataType: "json",
                success: function(link) {
                    $("#plcforsl").css("color", "green");
                    $("#plcforsl").html(link.shortUrl);
                    $("#cop").css("display","inline");
                }
            });
        });

        $("#subbtnc").click(function() {
            $("#cop").css("display","none");
            lin = tab.url;
            if (!lin.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) {
                $("#plcforsl").html("ERROR : URL must be like http://google.com");
                $("#plcforsl").css("color", "red");
                return;
            }
            $.ajax({
                url: "https://api.rebrandly.com/v1/links",
                type: "post",
                data: JSON.stringify({
                    "destination": lin,
                    "domain": {
                        "fullName": "rebrand.ly"
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                    "apikey": "36ef6cce73ad4c6c997d252afa4e356c"
                },
                dataType: "json",
                success: function(link) {
                    $("#plcforsl").css("color", "green");
                    $("#plcforsl").html(link.shortUrl);
                    $("#cop").css("display","inline");
                }
            });
        });

    });
    $("#cop").click(function(){
        copyDivToClipboard("plcforsl");
    });
});

function copyDivToClipboard(id) {
            var range = document.getSelection().getRangeAt(0);
            range.selectNode(document.getElementById(id));
            window.getSelection().addRange(range);
            document.execCommand("copy")
}