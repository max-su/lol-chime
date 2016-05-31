var express = require("express");
var leagueLib = require("./leagueLib");
var url = require("url");
//at the moment i just chain it all to the checkSummonerInGame if it gets that far.
var summonerID = leagueLib.getSummonerJSON("Quantum Bogosort", "NA");
var app = express();

app.get("/", function(req, res) {
        res.send("That worked fine.");
    }
);//.listen(3000);

app.get("/poll/", function(req, res) {
        var query = url.parse(req.url, true).query;
        var name = query.name;
        var region = query.region;
        res.send("The name is: " + name + "\nThe region is " + region);
    }
);

app.listen(3000);


