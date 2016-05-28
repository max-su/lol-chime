require("dotenv").config(); //keep api key in .env

var request = require("request");
var sleep = require("sleep");
/*USAGE
 *typeOfCall = summonerLookup OR gameLookup
 *region = na, eu, etc.
 *id = summonerName OR summonerID
 */
function getURL(typeOfCall, region, id) { 
	result = "https://" + region + ".api.pvp.net/";
	// at this point we should have something like https://na.api.pvp.net/
	// do /version/whateverAPIQuery
	switch(typeOfCall){
		case "summonerLookUp":
			result += "api/lol/" + region + "/v1.4/summoner/by-name/";
			break;
		case "gameLookUp":
			result += "observer-mode/rest/consumer/getSpectatorGameInfo/" + getregionID(region)+ "/";
			break;
	}
	result += id + "?api_key=" + process.env.APIKEY;
	return result;
}

var URL = getURL("summonerLookUp","NA","Quantum Bogosort");
console.log(URL + "\n");
var URL2 = getURL("gameLookUp","NA","20198954");
console.log(URL2 + "\n");

function getregionID(region) {
	switch(region){
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
}


function getSummoner(summonerName, region, callBack) { //we need to do lookup with summoner ID(an int), not a string
	request({
		url: getURL("summonerLookUp", region, summonerName),
		json: true
		}, 
		function (error, response, body) {
			if(!error && response.statusCode === 200){
				callBack(body, error, summonerName, true); //because this is ASynchronous i/o, 
				
			} else {
				callBack(body, error, summonerName, false);
			}
		}
	);
	//return body;
}

function cleanSummonerName(summonerName) {
	var ignTrim = summonerName.replace(" ","");
	ignTrim = ignTrim.toLowerCase();
	ignTrim = ignTrim.trim();
	return ignTrim;
}

var callBackSummonerID = function(body, error, summonerName, noError) { //summonerJSON must be declared!
	if(noError === true) {
		summoner = body;
		console.log(summoner);
		ign = cleanSummonerName(summonerName);
		console.log(summoner[ign].id);
	}else if(noError === false) {
		summonerError = error;
		console.log("Error: " + Error);
	}
};

var summonerError = {};
summoner = getSummoner("Quantum Bogosort", "NA", callBackSummonerID);

