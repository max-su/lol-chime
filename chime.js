var SummonerEmitter = require("./leagueLib/SummonerEmitter");
var leagueLib = require("./leagueLib/leagueLib");
var args = process.argv;
args.shift();
args.shift();
var summoner = args.join(" ");

if (summoner === "") {
    console.log("[!] Please provide a summoner name.");
    process.exit(1);
}

leagueLib.beep();
summonerTest = new SummonerEmitter(summoner, process.env.REGION);
leagueLib.initializeEvents(summonerTest);
