require("dotenv").config(); //keep api key in .env
var EventEmitter = require("events");
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

//class summonerEmitter extends EventEmitter {}
//summoner = new summonerEmitter();

module.exports.getSummonerID = function (summonerName, region) { //we need to do lookup with summoner ID(an int), not a string
    request({
	    url: getUrl("summonerLookUp", region, summonerName),
	    json: true
	    }, 
	    function (error, response, body) {
		if(!error && response.statusCode === 200) {
                    console.log(body);
                    var id = body[cleanSummonerName(summonerName)].id;
                    module.exports.checkSummonerInGame(id, region, false); 
		}
                else {
		    //module.exports.callBackSummonerID(body, error, summonerName, false, region);
		    //callBackSummonerID
		}
	    }		
	);
};

module.exports.checkSummonerInGame = function (id, region, firstTimeQuery){
    console.log(id);
    request({
	url: getUrl("gameLookUp", region, id),
	json: true
    	},
	function (error, response, body) {
	    if(!error && response.statusCode === 200) { //GAME FOUND
		console.log(body);				
	    }
            else if(!error && response.statusCode === 404) { //NO GAME FOUND
                console.log("Game not found");
		console.log(body);
	    }
            else {
		console.log(error);	
	    }
	}
    );
};

summonerID = module.exports.getSummonerID("Quantum Bogosort", "NA");
