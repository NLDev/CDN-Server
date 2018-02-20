"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

let express = require("express");
let http    = require("http");
let path    = require("path");
let fs      = require("fs");
let bParser = require("body-parser");
let favicon = require("serve-favicon");
let mOver   = require("method-override");

let log     = require("./api/logger");
let getIP   = require("./api/getip");
let config  = require("./api/configurator");
let routes  = require("./routes");

const app = express();

console.log(
    "            \n" +
    " ###########\n" +
    " #- - - - -#\n" +
    " # STARTED #\n" +
    " #- - - - -#\n" +
    " ###########\n" +
    "            \n" +
    "Copyright (c) " + (new Date()).getFullYear() + " NullDev\n"
);

let conf = config.getConfig();

const port = conf.server.port;

app.set("port", port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(favicon(path.join(__dirname, "assets", "favicon.png")));
app.use(bParser.urlencoded({ extended: true }));
app.use(bParser.json());
app.use(mOver());
app.use(express.static(path.join(__dirname, "assets")));

app.get("/", function(req, res){
    routes.index(req, res);
    log("Served " + req.url + " for " + getIP(req));
});

app.get("*", function(req, res){ render404(req, res); });

function render404(request, response){
    response.writeHead(404);
    response.end("404 File Not Found");
    log("Threw 404 for " + getIP(request) + " on route " + request.url, true);
}

app.listen(port, err => (err ? log(`Error on port ${port}`, true) : log(`Listening on port ${port}...`)));
