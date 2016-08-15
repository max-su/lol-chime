#!/usr/bin/env node

var SummonerEmitter = require("./leagueLib/SummonerEmitter");
var leagueLib = require("./leagueLib/leagueLib");
var config = require("home-config").load(".chimerc", {
    APIKEY: process.env.APIKEY,
    REGION: process.env.REGION,
    REFRESHRATE: process.env.REFRESHRATE
});

var args = process.argv;
args.shift();
args.shift();
var summoner = args.join(" ");

if (summoner === "") {
    console.log("[!] Please provide a summoner name.");
    process.exit(1);
}

summonerTest = new SummonerEmitter(summoner, config.REGION);
leagueLib.initializeEvents(summonerTest);
