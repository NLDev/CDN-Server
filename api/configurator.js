"use strict";
var fs  = require("fs");
var log = require("./logger");

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

require.extensions[".json"] = function (module, filename) { module.exports = fs.readFileSync(filename, "utf8"); };
const path = "../config.json"

const defaults = {
    "server": {
        "port": 1337,
        "meta": {
            "application_name": "Static CDN",
            "owner": "NullDev",
            "website": "https://nulldev.org"
        }
    }
}

var reset = function(){ fs.writeFileSync(path, defaults, function(err) { err ? log("Could not reset config: " + err, true) : log("Reset Config"); }); };

var getconfig = function(){
    if (!fs.existsSync(path)){
        log("Config does not exist!", true);
        fs.writeFileSync(path, defaults, function(err) { err ? log("Could not create config: " + err, true) : log("Created Config"); });
    } 
    var jsondata = require(path);
    
    if (validateJSON(jsondata)) return JSON.parse(jsondata);
    else {
        log("Config is invalid! Resetting...", true);
        this.reset();
        jsondata = require(path);
        return JSON.parse(defaults);
    }
};

function validateJSON(input){
    try { JSON.parse(input); } 
    catch (e){ return false; }
    return true;
}

module.exports = {
    getConfig: getconfig,
    reset: reset
};
