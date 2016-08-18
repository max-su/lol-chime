var config = require("home-config").load(".chimerc", {
    APIKEY: process.env.APIKEY,
    REGION: process.env.REGION,
    REFRESHRATE: process.env.REFRESHRATE
});

if (typeof config.APIKEY === "undefined") {
    console.log("[!] API key not found.");
    process.exit(1);
}

if (typeof config.REGION === "undefined") {
    console.log("[!] Region not set.");
    process.exit(1);
}

if (typeof config.REFRESHRATE === "undefined") {
    console.log("[!] Refresh rate not defined.");
    process.exit(1);
}

var player = require("play-sound")(opts={});
var request = require("request");
var SummonerEmitter = require("./SummonerEmitter");
module.exports = {};

var getUrl = function(typeOfCall, region, id) {
    result = "https://" + region + ".api.pvp.net/";
    switch (typeOfCall) {
        case "summonerLookUp":
            result += "api/lol/" + region + "/v1.4/summoner/by-name/";
            break;
        case "gameLookUp":
            result += "observer-mode/rest/consumer/getSpectatorGameInfo/" + getRegionID(region)+ "/";
            break;
        case "championLookUp":
            result += "api/lol/static-data/" + region + "/v1.2/champion/";
            break;
        default:
            throw new Error("Invalid call type.");
    }
    result += id + "?api_key=" + config.APIKEY;
    return result;
};

var cleanSummonerName = function(summonerName) {
    var ignTrim = summonerName.replace(/ /g, "");
    ignTrim = ignTrim.toLowerCase();
    ignTrim = ignTrim.trim();
    return ignTrim;
};

var getRegionID = function(region) {
    switch (region) {
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
            throw new Error("Invalid region.");
    }
};

module.exports.cleanSummonerName = cleanSummonerName;
module.exports.getUrl = getUrl;
module.exports.getRegionID = getRegionID;

module.exports.checkSummonerExists = function(SEArg) { //SEArg == SummonerEmitterArg
    if (SEArg instanceof SummonerEmitter) {
        request({
            url: getUrl("summonerLookUp", SEArg.getRegion(), SEArg.getName()),
            json: true //parses json string automatically into a js object
        },
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var name = SEArg.getName();
                var id = body[cleanSummonerName(name)].id;
                SEArg.setID(id);
                SEArg.setEmitState("ID Found");
            } else if (!error && response.statusCode === 429) { // Rate limited by the API
                SEArg.setEmitState("Rate limited");
            } else {
                SEArg.setEmitState("ID Not Found");
            }
        });
    }
};

module.exports.checkSummonerInGame = function(SEArg) {
    request({
        url: getUrl("gameLookUp", SEArg.getRegion(), SEArg.getID()),
        json: true
    },
    function(error, response, body) {
        if (!error && response.statusCode === 200) { //GAME FOUND
            SEArg.setGameLength(body.gameLength);

            if (!SEArg.getInit()) {
                //So we dont keep reInitializing these variables.
                SEArg.setInitial(body.gameMode, body.gameType, body.gameStartTime, body.gameQueueConfigId, body.mapId);

                var championID;
                for (var participant in body.participants) {
                    if (body.participants[participant].summonerId === SEArg.getID()) {
                        championID = body.participants[participant].championId;
                    }
                }
                if (typeof championID === "undefined") {
                    console.log("[*] Could not get champion ID.");
                    SEArg.printSummary();
                    SEArg.setEmitState("Game Found");
                } else {
                    request({
                        url: getUrl("championLookUp", SEArg.getRegion().toLowerCase(), championID),
                        json: true
                    },
                    function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            SEArg.setChampion(body.key);
                            console.log("[*] Playing as " + body.key);
                        } else if (!error && response.statusCode === 404) {
                            console.log("[*] Could not get champion.");
                        } else {
                            console.log(error);
                        }
                        SEArg.printSummary();
                        SEArg.setEmitState("Game Found");
                    });
                }
            } else {
                SEArg.setEmitState("Game Found");
            }
        } else if (!error && response.statusCode === 404) { //NO GAME FOUND
            SEArg.setEmitState("Game Not Found");
        } else if (!error && response.statusCode === 429) { // Rate limited by the API
            SEArg.setEmitState("Rate limited");
        } else {
            SEArg.setEmitState("Server Sucks");
        }
    });
};

module.exports.initializeEvents = function(SEArg) {
    SEArg.on("Not Initialized", function() {
        console.log("[*] Looking up summoner " + SEArg.getName());
        module.exports.checkSummonerExists(SEArg);
    });
    SEArg.on("ID Found", function() {
        console.log("[*] Summoner found! Checking if the player is in game.");
        module.exports.checkSummonerInGame(SEArg);
    });
    SEArg.on("ID Not Found", function() {
        console.log("[*] Summoner was not found.");
    });
    SEArg.on("Game Found", function() {
        SEArg.printCurrentGame();
        callBackMS = config.REFRESHRATE * 1000; //seconds to MS for setTimeOut
        setTimeout(function() {
            module.exports.checkSummonerInGame(SEArg);
        }, callBackMS);
    });
    SEArg.on("Game Not Found", function() {
        //if the game is found, conclude the game, else no summary.
        if (SEArg.getInit()) {
            module.exports.beep();
            SEArg.printSummary();
            SEArg.printCurrentGame();
            console.log("[*] The game has ended.");
        } else {
            console.log("[*] A game has not been found.");
        }
    });
    SEArg.on("Rate limited", function() {
        console.log("[!] The API rate limit has been reached. Waiting for " + config.REFRESHRATE + "s");
        setTimeout(function() {
            module.exports.checkSummonerInGame(SEArg);
        }, config.REFRESHRATE*1000);
    });
    SEArg.emit("Not Initialized");
};

module.exports.beep = function() {
    player.play(__dirname + "/bard.mp3", function(err) {
        if (err) {
            console.log("[*] Could not play audio.");
        }
    });
};
