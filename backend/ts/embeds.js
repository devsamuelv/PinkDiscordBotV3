"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord = __importStar(require("discord.js"));
var varibles = __importStar(require("./varibles"));
// ? import * as functions from './functions';
exports.ErrEmbed = new discord.RichEmbed({
    author: {
        name: "Pinky",
        icon_url: varibles.Botlogo
    },
    title: "Incorrect Permissions",
    description: "Im Sorry you dont have Moderator Permissions",
    color: 11111111
});
exports.gameNightEmbed = new discord.RichEmbed({
    author: {
        name: "Pinky",
        icon_url: varibles.Botlogo
    },
    title: "Game Night Info",
    description: "⌚Game Night is on Fridays At 7pm⌚",
    color: 11111111
});
exports.gameNightPoll = new discord.RichEmbed({
    title: "Game Night"
});
