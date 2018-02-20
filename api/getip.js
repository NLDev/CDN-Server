"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var getIP = function(req){
    return req.connection.remoteAddress        || 
           req.socket.remoteAddress            || 
           req.connection.socket.remoteAddress ||          
           req.headers['x-forwarded-for'].split(',').pop();         
};

module.exports = getIP;
