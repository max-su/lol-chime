require("dotenv").config(); //keep api key in .env
//var express = require("express");
var events = require("events");
var request = require("request");


module.exports = {}; 

//____API STUFF FOLLOWS_________________________________________________

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

/*______-YOU ARE NOW ENTERING CALLBACK HELL
//PREPARE URSELF
            _.'          .
           |P`            ?\
          ."h              "B
          (""h             "P
          ?""",          .""P
          {"``""oo____oo""""P
           '""888888888888,;
            `?88P^\,?88^\,Y
              88?\__d88\_/'
              `8o8888/\88P
               ,?oo88oo8P
     ___  __===~88~\\\\\|~====__ __       ___
 .-==ooo~odoooob ?8/////'oooood88888ooo?P88888?ooo?888PooooOoooooooo=~--
d,d8888obo8,oo8b,``~~~,o?8oo,8888**8P88?8`oo,o888?898o8P888P~8b
8o88888oP?.,,ooood8b,.oo.,oo88?o8888P^^^?8888P^^^^==+=~~~?8bo?P
?8.=~=.8do.,oo88888ooo,o,oo88888o,;                      `6
.?*o88ob`8.,o88888888oo,o,o88888o,'                       `\
|*o8888o`8,oo88888888oo,o,o?8888o'
`?o8888P`88,,oo88888oo,,.,oo88oo;
.8`o888'**888oo,,,,oood88oo,,d8'
doo,,oP  ?888o,,o8o,o8o,,,o8oo'
8od8bo'  `?88o,,o8o,o88o,.,o,o'
8o888o    `88o,,o8o,o8o,.,o,o'
?o888P     ===========<666>==
`?88P     ********************
 ?ooPb   ',odoo,************,b
d{{{{b\,(,oo88ooo,,********,oob
OOOOO \\,oo8888ooo,,******,o888,
(\\\\ ||,o8888888oo,,*****,o88o)
  \\\\/`,o8888888oo',*****,888o|
        `oo8888888o',*****,888o|
        `,o888888oo,,*****,o8oo'
        `,o88888oo,, *****,o8oP
        `?,o888oP,,  *****,ooP
         `8-==-P,    |****,,-='
          ?o88oP     |*'d*,o88
         .dboodb.     *;8*,o88
         ,od88boo     *,o*,o88'
         do8888ob     *`o*,o8P
         ?o8888oP     |`,|,oo'
         `o8888o'     `?o8oP
          `o88o'      ,o88o'
           ?ooP       `?88o'
          dooo'b      'o88oo,.
         '?o===o   ~-=8oo888888oo.__
         8888888     `~~~' `==~~~=-,' 
         ?8P?88P 
          V''V'     
		  ok ur brain will turn into putty in 2 lines.
FIRST FUNCTION IN CALLBACK HELL*/

module.exports.getSummonerJSON = function (summonerName, region) { //we need to do lookup with summoner ID(an int), not a string
	request({
		url: getUrl("summonerLookUp", region, summonerName),
		json: true
		}, 
		function (error, response, body) {
			if(!error && response.statusCode === 200) {
				module.exports.callBackSummonerID(body, error, summonerName, true, region); //because this is ASynchronous i/o, 			
				//callBackSummonerID
			}else {
				module.exports.callBackSummonerID(body, error, summonerName, false, region);
				//callBackSummonerID
			}
		}		
	);
};

//callBackFunctions[0]
module.exports.callBackSummonerID = function (body, error, summonerName, noError, region) { //summonerJSON must be declared!
	if(noError === true) {
		summoner = body;
		console.log(summoner);	
		id = summoner[cleanSummonerName(summonerName)].id;
		module.exports.checkSummonerInGame(id, region, false); 
        //emit event summoner ID found
	}else if(noError === false) {
        //emit event error
		console.log("Error: " + Error);
	}
};

//callBackFunctions[1]
module.exports.checkSummonerInGame = function (id, region, firstTimeQuery){
	console.log(id);
	request({
		url: getUrl("gameLookUp", region, id),
		json: true
		},
		function (error, response, body) {
			if(!error && response.statusCode === 200) { //GAME FOUND
				console.log(body);				
			}else if(!error && response.statusCode === 404) { //NO GAME FOUND
                console.log("error");
				console.log(body);
			}else {
				console.log(error);	
			}
		}
	);
};

//summonerID = getSummonerID("Quantum Bogosort", "NA", callBackFunctionList);
