var config = module.exports;

var buster = require("buster");
var assert = buster.referee.assert;

config["My tests"] = {
    environment: "browser",  // or "node"
    rootPath: "../",
    sources: [
        "Resources/Public/js/player.js",      // Paths are relative to config file
        "Resources/Public/js/jim-knopf/dist/knob.js",      // Paths are relative to config file
    ],
    tests: [
        "Resources/Public/js/tests/*.test.js",      // Paths are relative to config file
    ],
    resources: [
      {
        path: "/",
        file: "./Resources/Public/js/tests/player.html"
      }
    ],
    //extensions: [
    //    require('buster-istanbul')
    //]
};


buster.spec.expose(); // Make spec functions global
