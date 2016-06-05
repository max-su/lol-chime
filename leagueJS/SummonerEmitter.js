var EventEmitter = require("events");
var util = require("util");

function SummonerEmitter(name, region){
    EventEmitter.call(this); //inheriting EventEmitter
    this.name = name;
    this.region = region;
    this.ID = 0;
    this.state = "";
    this.gameLength = 0;
    this.gameMode = "";
    this.gameType = "";
    this.init = false;
}

util.inherits(SummonerEmitter, EventEmitter); //inherit the prototype methods from EventEmitter to summonerEmitter
SummonerEmitter.prototype = Object.create(EventEmitter.prototype);
SummonerEmitter.constructor = SummonerEmitter;

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
    if(this.ID === 0) {
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
    if(this.state === "") {
        console.log("There is an error, state is not set.");
    }
    return this.ID;
};

SummonerEmitter.prototype.setGameLength = function(gameLength) {
    this.gameLength = gameLength;
};
SummonerEmitter.prototype.getGameLength = function() {
    if(this.gameLength === 0) {
        console.log("There is an error, gameLength is not set.");
    }
    return this.gameLength;
};
SummonerEmitter.prototype.getGameMode = function() { //static
    if(this.gameType === "") {
        console.log("There is an error, gameMode is not set.");
    }
    return this.gameType;
};
SummonerEmitter.prototype.getGameType = function() { //static
    if(this.gameType === "") {
        console.log("There is an error, gameMode is not set.");
    }
    return this.gameType;
};
SummonerEmitter.prototype.getGameStartTime = function() {//static
    if(this.gameStartTime === 0){
        console.log("There is an error, gameMode is not set.");
    }
    return this.gameStartTime;
};
SummonerEmitter.prototype.getInit = function() { //static; so we dont keep initializing
    return this.init; 
};

SummonerEmitter.prototype.setInitial = function(gameMode, gameType, gameStartTime) {
    this.gameMode = gameMode; 
    this.gameType = gameType;
    this.gameStartTime = gameStartTime;
    this.init = true;
};
/*
SummonerEmitter.prototype.nextCallBackTime(){
    
}
*/
module.exports = SummonerEmitter;
