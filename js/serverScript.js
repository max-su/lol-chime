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


function getSummonerJSON(summonerName, region, callBack) { //we need to do lookup with summoner ID(an int), not a string
	request({
		url: getURL("summonerLookUp", region, summonerName),
		json: true
		}, 
		function (error, response, body) {
			if(!error && response.statusCode === 200){
				//console.log(body);
				callBack(body);
			} else {
				console.log("Error: " + Error);
			}
		}
	);
	//return body;
}

function cleanSummonerName(summonerName) {
	var summonerNameJSON = summonerName.replace(" ","");
	summonerNameJSON = summonerNameJSON.toLowerCase();
	summonerNameJSON = summonerNameJSON.trim();	
}

function getSummonerID(summonerName, region) {
	var summoner = JSON.parse(getSummonerJSON(summonerName, region));
	cleanIGN = cleanSummonerName(summonerName);
	return summoner.cleanIGN.id;
}

var URL = getURL("summonerLookUp","NA","Quantum Bogosort");
console.log(URL + "\n");
var URL2 = getURL("gameLookUp","NA","20198954");
console.log(URL2 + "\n");

var summonerJSON = {};
getSummonerJSON("Quantum Bogosort", "NA", function(body) {
	summonerJSON = body;
	console.log(summonerJSON);
});
//console.log(summonerJSON + "\n");
//var summonerID = getSummonerID("Quantum Bogosort", "NA");

