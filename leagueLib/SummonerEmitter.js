var constants = require("./constants.js");
var EventEmitter = require("events");
var util = require("util");

function SummonerEmitter(name, region){
    EventEmitter.call(this); //inheriting EventEmitter
    this.name = name;
    this.region = region;
    this.ID = -1;
    this.state = "";
    this.gameLength = -1;
    this.gameMode = "";
    this.gameType = "";
    this.init = false;
    this.queueType = "";
    this.champion = "";
    this.map = "";
}

util.inherits(SummonerEmitter, EventEmitter); //inherit the prototype methods from EventEmitter to summonerEmitter
SummonerEmitter.prototype = Object.create(EventEmitter.prototype);
SummonerEmitter.constructor = SummonerEmitter;

SummonerEmitter.prototype.setChampion = function(champion) {
    this.champion = champion;
};

SummonerEmitter.prototype.getChampion = function() {
    return this.champion;
};

SummonerEmitter.prototype.setMap = function(map) {
    this.map = map;
};

SummonerEmitter.prototype.getMap = function() {
    return this.map;
};

SummonerEmitter.prototype.setQueueType = function(queueType) {
    this.queueType = queueType;
};

SummonerEmitter.prototype.getQueueType = function() {
    return this.queueType;
};

SummonerEmitter.prototype.getName = function() {
    return this.name;
};

SummonerEmitter.prototype.getRegion = function() {
    return this.region;
};

SummonerEmitter.prototype.setID = function(ID) {
    this.ID = ID;
};

SummonerEmitter.prototype.getID = function() {
    if (this.ID === 0) {
        console.log("There is an error, ID is not set.");
    }
    return this.ID;
};

SummonerEmitter.prototype.setState = function(state) {
    this.state = state;
};

SummonerEmitter.prototype.setEmitState = function(state) {
    this.state = state;
    this.emit(state);
};

SummonerEmitter.prototype.getState = function() {
    if (this.state === "") {
        console.log("There is an error, state is not set.");
    }
    return this.ID;
};

//the below are all static with the exception of game Length which is the only one that should be updated.
SummonerEmitter.prototype.setGameLength = function(gameLength) {
    this.gameLength = (gameLength / 60);
    this.gameLength = this.gameLength.toString().substring(0,6);
};

SummonerEmitter.prototype.getGameLength = function() {
    if (this.gameLength === -1) {
        console.log("There is an error, gameLength is not set.");
    }
    return this.gameLength;
};

SummonerEmitter.prototype.getGameMode = function() { //static
    if (this.gameType === "") {
        console.log("There is an error, gameMode is not set.");
    }
    return this.gameMode;
};

SummonerEmitter.prototype.getGameType = function() { //static
    if (this.gameType === "") {
        console.log("There is an error, gameType is not set.");
    }
    return this.gameType;
};

SummonerEmitter.prototype.getGameStartTime = function() {//static
    if (this.gameStartTime === "") {
        console.log("There is an error, gameStartTime is not set.");
    }
    return this.gameStartTime;
};

SummonerEmitter.prototype.getInit = function() { //static; so we dont keep initializing
    return this.init;
};

SummonerEmitter.prototype.setInitial = function(gameMode, gameType, gameStartTime, queueType, map) {
    this.gameMode = gameMode;
    this.gameType = gameType;
    this.gameStartTime = new Date(gameStartTime).toLocaleTimeString(); //conversion from epoch milliseconds to human readable
    this.init = true;
    this.queueType = queueType;
    this.map = map;
};

SummonerEmitter.prototype.printCurrentGame = function() {
    if (this.getInit() === true) {
        console.log("\n[*] Game started at " + this.getGameStartTime());
        console.log("[*] Game has been running for " + this.getGameLength() + " minutes.\n");
    }
};

SummonerEmitter.prototype.printSummary = function() {
    var gameType = constants.gameTypes[this.getGameType()];
    var gameMode = constants.gameModes[this.getGameMode()];
    var queueType = constants.queueTypes[this.getQueueType()];
    var map = constants.maps[this.getMap()];
    console.log("[*] IGN: " + this.getName());
    console.log("[*] Region: " + this.getRegion());
    console.log("[*] Game Type: " + gameType);
    console.log("[*] Game Mode: " + gameMode);
    console.log("[*] Queue Type: " + queueType);
    console.log("[*] Map: " + map);
};

module.exports = SummonerEmitter;
