require("dotenv").config(); //keep api key in .env
var $ = require('jquery');

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

function cleanSummonerName(summonerName) {
	var summonerNameJSON = summonerName.replace(" ","");
	summonerNameJSON = summonerNameJSON.toLowerCase();
	summonerNameJSON = summonerNameJSON.trim();	
}

function getSummonerID(summonerName, region) { //we need to do lookup with summoner ID(an int), not a string
	$.ajax({
		url: getURL("summonerLookUp",region,summonerName),
		type: "GET",
		dataType: "json",
		data: {},
		success: function (json) {
			return json[cleanSummonerName(summonerName)].id;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			process.stdout.write("Error!");
		}
	});	
}

var URL = getURL("summonerLookUp","NA","Quantum Bogosort");
process.stdout.write(URL + "\n");
var URL2 = getURL("gameLookUp","NA","20198954");
process.stdout.write(URL2 + "\n");

var ID = getSummonerID("Quantum Bogosort", "NA");
process.stdout.write(ID + "\n");
