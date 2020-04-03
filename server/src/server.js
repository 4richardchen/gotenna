"use strict";

const express = require("express");
const https = require("https");

// local config
const PORT = 8080; //todo: get from env
const HOST = "0.0.0.0"; //todo: get from env

// app
const server = express();
server.get("/", (req_express, res_express) => {
  const url = "https://pastebin.com/raw/BmA8B0tY" //todo: use config/default.EXT

	https.get(url, (res_https) => {
	  let data = "";

	  // store chunks
	  res_https.on("data", (chunk) => {
	    data += chunk;
	  });

	  // turn response into list
	  res_https.on("end", () => {
	    let list = data.split(/\r?\n/); //make array of urls
		  res_express.setHeader("Content-Type", "application/json");
	    res_express.json(list);
	  });

	}).on("error", (error) => {
	  res_express.setHeader("Content-Type", "application/json");
	  res_express.json({
	  	"Error": true,
	  	"Message": error.message
	  });
	});
});

server.listen(PORT, HOST);
