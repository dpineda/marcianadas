var cron = require('node-cron');
var feed = require("feed-read");
var request = require("request");
var intervalId;

cron.schedule('00 30 11 * * 5', function(){
  // Runs every Friday at 11:30:00 AM.
  intervalId = setInterval(Yastan, 20000);
});

function Yastan () {
    feed("http://marcianosmx.com/feed/", function(err, articles) {
        if (err) throw err;
        var link;
        var yastan =  false;
        
        articles.forEach(function(article) {
            if(article.title.includes("arcianadas")) {
                link = article.link;
                yastan = true;
            }
        });

        if(yastan) {
            var msg = "Yastan!!! :) -> " + link;
            clearInterval(intervalId);            
            sendSlack(link);          
        } 
        else console.log((new Date()).toISOString()+ "  -  tobia nostan :(");
    });
};

var sendSlack =  function(link) {
    var text = "@here Aquí estan las marcianadas!!! --->"
    + " <" + link + "> "
    + " ..... enjoy fap fap fap :herbalife: ";

    var options = {
        uri: process.env.SLACK_URL,
        method: 'POST',
        json: {"text": text }
    }
    request(options, function(error, response, body){
        if(error) console.log(error);
        else console.log(body);
    });
}