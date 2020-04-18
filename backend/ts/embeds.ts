import * as discord from 'discord.js';
import * as varibles from './varibles';
// ? import * as functions from './functions';

export const ErrEmbed = new discord.RichEmbed({
    author: {
        name: "Pinky",
        icon_url: varibles.Botlogo
    },
    title: "Incorrect Permissions",
    description: "Im Sorry you dont have Moderator Permissions",
    color: 11111111
});

export const gameNightEmbed = new discord.RichEmbed({
    author: {
        name: "Pinky",
        icon_url: varibles.Botlogo
    },
    title: "Game Night Info",
    description: "⌚Game Night is on Fridays At 7pm⌚",
    color: 11111111
});

export const gameNightPoll = new discord.RichEmbed({
    title: "Game Night"
})