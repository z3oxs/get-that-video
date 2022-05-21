"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reddit = exports.facebook = exports.rumble = exports.twitter = void 0;
// Valid libs export
var twitter_1 = require("./methods/twitter");
Object.defineProperty(exports, "twitter", { enumerable: true, get: function () { return twitter_1.twitter; } });
var rumble_1 = require("./methods/rumble");
Object.defineProperty(exports, "rumble", { enumerable: true, get: function () { return rumble_1.rumble; } });
var facebook_1 = require("./methods/facebook");
Object.defineProperty(exports, "facebook", { enumerable: true, get: function () { return facebook_1.facebook; } });
var reddit_1 = require("./methods/reddit");
Object.defineProperty(exports, "reddit", { enumerable: true, get: function () { return reddit_1.reddit; } });
