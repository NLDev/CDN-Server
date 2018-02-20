"use strict";
var fs      = require("fs");
var config  = require("../api/configurator");

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var raw = config.getConfig();

exports.index = function(req, res){ 
    res.render("index", { 
        name:  raw.server.meta.application_name,
        owner: raw.server.meta.owner,
        web:   raw.server.meta.website
    }); 
};
