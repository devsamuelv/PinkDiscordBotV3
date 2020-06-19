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
var SongEmbed = new discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addField({ name: 'Regular field title', value: 'Some value here' }, { name: '\u200B', value: '\u200B' })
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
exports.ErrEmbed = new discord.RichEmbed()
    .setTitle("Incorrect Permissions")
    .setAuthor("Pinky", varibles.Botlogo)
    .setDescription("Im Sorry you dont have Moderator Permissions")
    .setColor(11111111)
    .setTimestamp();
exports.gameNightEmbed = new discord.RichEmbed()
    .setTitle("Game Night Info")
    .setDescription("⌚Game Night is on Fridays At 7pm⌚")
    .setColor(11111111)
    .setAuthor("Pinky", varibles.Botlogo);
