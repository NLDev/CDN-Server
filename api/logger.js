"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var log = function(txt, err){
    var date = new Date();
    var hour = date.getHours(),
        min  = date.getMinutes(),
        sec  = date.getSeconds();

    hour  = (hour < 10 ? "0" : "") + hour;
    min   = (min  < 10 ? "0" : "") + min;
    sec   = (sec  < 10 ? "0" : "") + sec;

    var head = (err ? "[ERROR]" : "[INFO] ");

    console.log(head + " [" + hour + ":" + min + ":" + sec + "] - " + txt);
};

module.exports = log;
