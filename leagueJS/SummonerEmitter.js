var EventEmitter = require("events");
var util = require("util");

function SummonerEmitter(name, region){
    EventEmitter.call(this); //inheriting EventEmitter
    this.name = name;
    this.region = region;
    this.ID = 0;
    this.state = "";
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
    if(this.ID === 0){
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

SummonerEmitter.prototype.getState = function(){
    if(this.state === ""){
        console.log("There is an error, state is not set.");
    }
    return this.ID;
};

module.exports = SummonerEmitter;

