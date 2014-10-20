var app = (function() {
    
    var webServices = {
        lastFm : {
            searchArtistByName : function(artist, callback) {
                var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + encodeURI(artist) + "&api_key=ebae15afecf2443398e62e755fbdd336&format=json&autocorrect=1";
                $.ajax({
                    url: url,
                    success : callback
                });
            }
        }
    };
    
    var plugins = {
        Youtube : {
            search : function(artist) {
                cordova.exec(function(successMessage) {
                    console.log(successMessage);
                }, function(errorMessage) {
                    console.log(errorMessage);
                }, "Youtube", "search", [artist]);
            }
        }
    };
    
    function searchCallback(data) {
        if(data.artist) {
            var name = data.artist.name;
            var image = data.artist.image[3]["#text"];
            var summary = data.artist.bio.summary;
            if(name && image && summary) {
                console.log("Found Last.FM result!");
                summary = summary.replace(/<a .*?>(.*?)<\/a>/g,"$1").replace(/Read more about .* on Last\.fm\./,"");
                $(".result").html("<a href='#begin'></a><div class='title'>" + name + "</div><br /><img src='" + image + "' class='logo'/><br />" + summary+ "<img src='img/youtube.png' class='youtube'/>");
                var content = $(".content");
                var scrollTo = $("a[href='#begin']");
                content.animate({
                    scrollTop: scrollTo.offset().top - content.offset().top + content.scrollTop()
                });
                $(".youtube").click(function() {
                    console.log("Youtube clicked!");
                    app.plugins.Youtube.search(name);
                });
                localStorage.lastArtist = name;
            } else {
                $(".result").html("<div class='title'>Not found</div>");
            }
        } else {
            $(".result").html("<div class='title'>Not found</div>");
        }
    }
    
    function initialize() {
        bindEvents();
        console.log("Initialized !");
    }
    
    function bindEvents() {
        $(document).on("deviceready", deviceReady);
        $(document).keypress(inputHandler);
    }
    
    function deviceReady() {
        console.log("Device Ready!");
        if(localStorage.lastArtist) {
            app.webServices.lastFm.searchArtistByName(localStorage.lastArtist, searchCallback);
        }
    }
    
    function inputHandler(e) {
        if(e.which == 13) { // 13 == ENTER
            console.log("Enter pressed!");
            var artist = $("input").val();
            $(".search").val("");
            $(".search").blur();
            app.webServices.lastFm.searchArtistByName(artist, searchCallback);
        }
    }
    
    initialize();
    
    return {
        webServices : webServices,
        plugins : plugins
    }
}());