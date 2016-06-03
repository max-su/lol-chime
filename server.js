var express = require("express");
var leagueLib = require("./leagueLib");
var url = require("url");
//at the moment i just chain it all to the checkSummonerInGame if it gets that far.
var summonerID = leagueLib.getSummonerJSON("Quantum Bogosort", "NA");
var app = express();

app.set("port", 3000);

app.get("/", function(req, res) {
        res.type("text/plain");
        res.send("LoL-Chime main homepage woo");
    }
);

app.get("/poll", function(req, res) {
        var query = url.parse(req.url, true).query;
        var name = query.name;
        var region = query.region;
        res.send("The name is: " + name + "\nThe region is " + region);
        console.log(summonerID);
    }
);

app.use(function (req, res){
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
                

app.listen(app.get("port"), function(){
        console.log("Express started on http://localhost:" +
                    app.get("port") + "; press Ctrl-C to terminate.");    
    }
);


