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
let formid  = require("formidable");
let mOver   = require("method-override");

let log     = require("./api/logger");
let init    = require("./api/init");
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
    //log("Served " + req.url + " for " + getIP(req));
});

app.post("/upload", function(req, res){
    let form = new formid.IncomingForm();
    let filename = null;
    form.multiples = true;
    form.uploadDir = path.join(__dirname, "/DATA");
    form.on("file", function(field, file){ 
        filename = file.name;
        log("Server received file: " + filename);
        fs.rename(file.path, path.join(form.uploadDir, filename), (error) => { if (error) log("Error while moving file \"" + filename + "\": " + error) }); 
    });
    form.on("error", function(err){ log("Error while uploading: " + err); });
    form.on("end", function(){ 
        log("Sucessfully uploaded \"" + filename + "\"");
        res.end("success"); 
    });
    form.parse(req);
});

app.get("*", function(req, res){ render404(req, res); });

function render404(request, response){
    response.writeHead(404);
    response.end("404 File Not Found");
    log("Threw 404 for " + getIP(request) + " on route " + request.url, true);
}

init();
app.listen(port, err => (err ? log(`Error on port ${port}: ${err}`, true) : log(`Listening on port ${port}...`)));
