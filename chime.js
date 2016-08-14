var argv = require('minimist')(process.argv.slice(2));

var SummonerEmitter = require("./leagueLib/SummonerEmitter");
var leagueLib = require("./leagueLib/leagueLib");

var args = process.argv;
args.shift();
args.shift();

var summoner = args.join(" ");

summonerTest = new SummonerEmitter(summoner, process.env.REGION);
leagueLib.initializeEvents(summonerTest);
