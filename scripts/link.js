#!/usr/bin/env node

var link = require("fs-symlink"),
    path = require("path"),
    root = path.resolve(__dirname + "/../");

console.log("Creating tidyfolders symlink");
link(root + "src", root + "node_modules/tidyfolders", "junction")
    .then(function () {
        console.log("Symlink created successfully.");
    })
    .catch(function(err) {
        console.error(err);
    });
