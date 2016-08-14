var argv = require('minimist')(process.argv.slice(2));

var SummonerEmitter = require("./leagueLib/SummonerEmitter");
var leagueLib = require("./leagueLib/leagueLib");

summonerTest = new SummonerEmitter(argv.summoner, process.env.REGION);
leagueLib.initializeEvents(summonerTest);
