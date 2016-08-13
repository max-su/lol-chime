require("dotenv").config(); //keep api key in .env
var request = require("request");
var SummonerEmitter = require("./SummonerEmitter");
module.exports = {}; //prepping exports
/*USAGE for getUrl(typeOfCall, region, id)
 *typeOfCall = summonerLookup OR gameLookup
 *region = na, eu, etc.
 *id = summonerName OR summonerID
 */

var getUrl = function (typeOfCall, region, id) { 
    result = "https://" + region + ".api.pvp.net/";
    switch(typeOfCall){
        case "summonerLookUp":
            result += "api/lol/" + region + "/v1.4/summoner/by-name/";
            break;
        case "gameLookUp":
            result += "observer-mode/rest/consumer/getSpectatorGameInfo/" + getRegionID(region)+ "/";
            break;
    }
    result += id + "?api_key=" + process.env.APIKEY;
    return result;
};

var cleanSummonerName = function (summonerName) {
    var ignTrim = summonerName.replace(" ","");
    ignTrim = ignTrim.toLowerCase();
    ignTrim = ignTrim.trim();
    return ignTrim;
};

var getRegionID = function (region) {
    switch(region) {
        case "BR":
            return "BR1";
        case "EUNE":
            return "EUN1";
        case "EUW":
            return "EUW1";
        case "JP":
            return "JP1";
        case "KR":
            return "KR";
        case "LAN":
            return "LA1";
        case "LAS":
            return "LA2";
        case "NA":
            return "NA1";
        case "OCE":
            return "OC1";
        case "TR":
            return "TR1";
        case "RU":
            return "RU";
        default:
            return "Error!";
    }
};

module.exports.checkSummonerExists = function (SEArg) { //SEArg == SummonerEmitterArg
    if(SEArg instanceof SummonerEmitter){
        request({
            url: getUrl("summonerLookUp", SEArg.getRegion(), SEArg.getName()),
            json: true //parses json string automatically into a js object
            }, 
            function (error, response, body) {
                if(!error && response.statusCode === 200) {
                    var name = SEArg.getName();
                    var id = body[cleanSummonerName(name)].id;
                    SEArg.setID(id);
                    SEArg.setEmitState("ID Found");
                }
                else {
                    SEArg.setEmitState("ID Not Found");
                }
            }		
        );
    }
};

module.exports.checkSummonerInGame = function(SEArg) {
    request({
        url: getUrl("gameLookUp", SEArg.getRegion(), SEArg.getID()),
        json: true
        },
        function (error, response, body) {
            if(!error && response.statusCode === 200) { //GAME FOUND
                if(SEArg.getInit() === false){
                    SEArg.setInitial(body.gameMode, body.gameType, body.gameStartTime);
                    //So we dont keep reInitializing these variables.
                }
                SEArg.setGameLength(body.gameLength);
                //This is the only thing we're updating, how long the game is.
                setTimeout(function() {
                    SEArg.setEmitState("Game Found");
                }, 30000); //callBack emit this in 30seconds.
            }
            else if(!error && response.statusCode === 404) { //NO GAME FOUND
                SEArg.setEmitState("Game Not Found");
            }
            else {
                console.log("Server Sucks idk mang");
                SEArg.setEmitState("Server Sucks");
            }
        }
    );
};

module.exports.initializeEvents = function (SEArg){
    SEArg.on("Not Initialized", function() {
        module.exports.checkSummonerExists(SEArg);
        }
    );
    SEArg.on("ID Found", function() {
        module.exports.checkSummonerInGame(SEArg);    
        }
    );
    SEArg.on("ID Not Found", function() {
        console.log("A Summoner was not found matching the IGN " + SEArg.getName() + " in the " + SEArg.getRegion() + " region.");
        }
    );
    SEArg.on("Game Found", function() {
        module.exports.checkSummonerInGame(SEArg);  
        }
    );
    SEArg.on("Game Not Found",function() {
        console.log("Requested IGN: " + SEArg.getName() + "\n" +
                    "Requested Region: " + SEArg.getRegion() + "\n");
        console.log("A game has not been found.");

        }
    );
    SEArg.emit("Not Initialized");//could be made more efficient, dont have to listen for Not init  and just start checkSummonerExists.
};

summonerTest = new SummonerEmitter("Quantum Bogosort", "NA");
module.exports.initializeEvents(summonerTest);
