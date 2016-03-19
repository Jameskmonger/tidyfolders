#!/usr/bin/env node

var moveDir = require('fs-movedir');
var FileSystem = require('./src/file-system').FileSystem;
var SimpleOrganizer = require('./src/simple-organizer').SimpleOrganizer;
var Manager = require('./src/tidyfolders-manager').TidyFoldersManager;

var fileSystem = new FileSystem(moveDir);
var organizer = new SimpleOrganizer();
var manager = new Manager(fileSystem, organizer);

manager.organizeDirectory(process.cwd(), function() {
    console.log('Folder tidying complete!');
});
