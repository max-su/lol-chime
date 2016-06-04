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

module.exports.getSummonerID = function (SEArg) { //SEArg == SummonerEmitterArg
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
                SEArg.setEmitState("Game Not Found");
            }
            else {
                SEArg.setEmitState("Server Sucks");
            }
        }
    );
};

summonerTest = new SummonerEmitter("clg imaqtpie69", "NA");
module.exports.setOn = function (SEArg){
    SEArg.on("IDFound", function() {
            module.exports.checkSummonerInGame(summonerEmitter.id, summonerEmitter.region);
        }
    );
    SEArg.on("GameFound", function() {
            module.exports.checkSummonerInGame(summonerEmitter.id, summonerEmitter.region);  
        }
    );
};

