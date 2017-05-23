var cron = require('node-cron');
var feed = require("feed-read");
var request = require("request");
var intervalId;

cron.schedule('*/2 * * * *', function(){
  console.log('running a task every two minutes');
  //intervalId = setInterval(Yastan, 20000);
  sendSlack("ignore.com")
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
            //console.log(msg);            
            clearInterval(intervalId);            
            //sendSlack(link);          
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