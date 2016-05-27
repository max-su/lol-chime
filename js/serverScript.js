function getSummonerID(summonerName) { //we need to do lookup with summoner ID(an int), not a string
	return "";
}

/*USAGE
 *typeOfCall = summonerLookup OR gameLookup
 *region = na, eu, etc.
 *
 */
function getURL(typeOfCall, region, id) { //id can be summonerName or summonerIntValue
	string result = "https://" + region + ".api.pvp.net/api/lol/" + region + "/";
	// at this point we should have something like https://na.api.pvp.net/api/lol/na/
	// do /version/whateverAPIQuery
	switch(typeOfCall){
		case summonerLookup:
			result += "v1.4/summoner/by-name/" + id	+ "?" + "api_key=" + APIKEY;
			//https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/quantum bogosort?api_key=7d2ef177-a3d5-4636-b6ad-bddfd75cec22	
			//https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/quantum bogosort?api_key=7d2ef177-a3d5-4636-b6ad-bddfd75cec22
			break;
		case gameLookup:
			result += ""
			break;
	}
	return result;
}
