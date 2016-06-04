require("dotenv").config(); //keep api key in .env
var EventEmitter = require("events").EventEmitter;
var request = require("request");

/*USAGE for getUrl(typeOfCall, region, id)
 *typeOfCall = summonerLookup OR gameLookup
 *region = na, eu, etc.
 *id = summonerName OR summonerID
 */

var getUrl = function (typeOfCall, region, id) { 
    result = "https://" + region + ".api.pvp.net/";
    // at this point we should have something like https://na.api.pvp.net/
    // do /version/whateverAPIQuery
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

module.exports = {}; 

summonerEmitter = new EventEmitter();
summonerEmitter.state = "notFound";

//the above step is nto necessary for initialization but makes me feel better about wtf im writing
module.exports.getSummonerID = function (summonerName, region) { //we need to do lookup with summoner ID(an int), not a string
    request({
	    url: getUrl("summonerLookUp", region, summonerName),
	    json: true
	    }, 
	    function (error, response, body) {
                    summonerEmitter.region = region;
		if(!error && response.statusCode === 200) {
                    var id = body[cleanSummonerName(summonerName)].id;
                    summonerEmitter.id = id;
                    summonerEmitter.state = "found";
                    summonerEmitter.emit("IDFound");
		}
                else {
                    summonerEmitter.state = "notFound";
                    summonerEmitter.emit("IDNotFound");
		}
	    }		
	);
};

module.exports.checkSummonerInGame = function(id, region) {
    console.log(id);
    request({
	url: getUrl("gameLookUp", region, id),
	json: true
    	},
	function (error, response, body) {
	    if(!error && response.statusCode === 200) { //GAME FOUND
		console.log(body);				
                setTimeout(function() {
                    summonerEmitter.emit("GameFound");
                    }, 30000);
	    }
            else if(!error && response.statusCode === 404) { //NO GAME FOUND
                console.log("Game not found");
                summonerEmitter.emit("GameNotFound");
	    }
            else {
		summonerEmitter.emit("The world exploded");
	    }
	}
    );
};

summonerEmitter.on("IDFound", function() {
        module.exports.checkSummonerInGame(summonerEmitter.id, summonerEmitter.region);
    }
);

summonerEmitter.on("GameFound", function() {
        module.exports.checkSummonerInGame(summonerEmitter.id, summonerEmitter.region);  
    }
);

module.exports.getSummonerID("3ofSpades", "NA");

