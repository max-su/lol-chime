var SummonerEmitter = require("./leagueLib/SummonerEmitter");
var leagueLib = require("./leagueLib/leagueLib");

summonerTest = new SummonerEmitter("Quantum Bogosort", "NA");
leagueLib.initializeEvents(summonerTest);
