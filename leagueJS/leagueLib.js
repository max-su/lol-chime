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
                console.log(body);				
                setTimeout(function() {
                    SEArg.setEmitState("Game Found");
                }, 30000); //callBack emit this in 30seconds.
            }
            else if(!error && response.statusCode === 404) { //NO GAME FOUND
                console.log("Game Not Found");
                SEArg.setEmitState("Game Not Found");
            }
            else {
                console.log("Server Sucks");
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
    SEArg.on("Game Found", function() {
            module.exports.checkSummonerInGame(SEArg);  
        }
    );
    SEArg.emit("Not Initialized");
};

summonerTest = new SummonerEmitter("ConstantFighting", "NA");
summonerTest2 = new SummonerEmitter("xKurayami", "NA");
module.exports.initializeEvents(summonerTest);
module.exports.initializeEvents(summonerTest2);
