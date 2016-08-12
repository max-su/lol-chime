var express = require("express");
var leagueLib = require("./leagueJS/leagueLib");
var SummonerEmitter = require("./leagueJS/SummonerEmitter");
var url = require("url");
//at the moment i just chain it all to the checkSummonerInGame if it gets that far.
var app = express();
app.set("port", 3000);

app.use(express.static("public"));

//setting pathing & querystring
app.get("/", function(req, res) {
        res.sendFile("public/index.html")
    }
);

app.get("/poll", function(req, res) {
        var query = url.parse(req.url, true).query;
        var name = query.name;
        var region = query.region;
        res.send("The name is: " + name + "\nThe region is " + region);
    }
);

app.use(function (req, res){ //we put this after this get/use because the order in which routes and middlewhere are added is significant
        res.type("text/plain");
        res.status(404);
        res.send("404 - Not Found");
    }
);

app.use(function (err, req, res, next){
        console.error(err.stack);
        res.type("text/plain");
        res.status(500);
        res.send("500 - Server error");
    }
);

app.listen(app.get("port"), function() {
        console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
    }
);
