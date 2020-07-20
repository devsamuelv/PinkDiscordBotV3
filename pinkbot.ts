import { Client, Message, Emoji, TextChannel } from 'discord.js';
import * as backend from './backend/ts/embeds';
import * as varibles from './backend/ts/varibles';

import * as ytdl from 'ytdl-core';
import * as http from 'http';
import * as dotenv from 'dotenv'; 
import * as fs from 'fs'; 

//const emoji = require('emoji.json');
const bot = new Client();
const prefix = '_';

const badnames = ['pipebomb', 'pipe bomb', 'bomb', 'weed', 'pp small'];
var volume = 1;

dotenv.config();

var servers = {};
var songs: string[] = [

];

// for commands and moderation
bot.on('message', (message) => {
    // * varibles here
    const guild_name = message.guild.name;

    // * functions here 

    const args = message.content.substr(prefix.length).split(' ');

    badnames.forEach((name) => {
        if (message.content.includes(name)) {
            message.channel.delete();
        }
    })

    function disconnect() {
        const channelID = message.member.voiceChannel.id;

        bot.voiceConnections.forEach((channel) => {
            if (channel.channel.id == channelID) {
                channel.disconnect();

                message.channel.send("Disconnected From " + channel.channel.name);
            }
        })
    }

    function printEmoji(EmojiName: string, guild: string): Emoji {
        var EmojiID = "";
    
        bot.emojis.forEach((emoji) => {
            if (emoji.name == EmojiName) {
                EmojiID = emoji.id;
            }
        })
        
        // ! trust it is not null
        return new Emoji(bot.guilds.get(guild)!, bot.emojis.get(EmojiID)!);
    }

    try {
        // put all messages in the try function to catch errors
        switch (args[0]) {
            case "meme":
                // todo work on this later
                message.channel.send("Sending Memes");
                break;

            case "help":
                message.channel.send("Commands: _meme, _help, _hi, _ban, _update-emoji, _bass-boost <url> <boost level>, disconnect");
                break;

                // ! fix banning its not getting the command
            case "ban":
                const banUser = message.mentions.users.first();
                const banMessage = args[2];

                if (banUser.username == null) { message.channel.send("Please Enter a username."); return; }

                if (message.member.roles.some(roles => roles.name === "Moderator")) {
                    message.guild.member(banUser).ban(banMessage).then(() => {
                        message.channel.send(`the user ${banUser} was banned`);
                    }).catch((err) => {
                        message.channel.send(`Error User Not Banned ${err}`);
                    })
                } else {
                    message.channel.send(backend.ErrEmbed);
                }

                break;

            case 'game-night':
                const test =
                    `${message.guild.roles.get(varibles.GameNight)} Alright, its time to vote for this week's Game Night! Please, vote for the games you want to play! Also, please only vote if you will play said game(s)! We have had people messing up the vote because they don't play but vote anyways, and it is hard to decide what to do. \n`

                +"\n" +
                "**Please note:** Jackbox games will be played every week unless the majority does not want to play. \n"

                +
                `If you do not want to play any Jackbox games, please vote with ${printEmoji(guild_name, varibles.Jackbox)} \n`

                +
                "\n" +
                `**1) Animal Crossing: New Horizons -** ${printEmoji(guild_name, varibles.AnimalCrossing)} \n` +
                `**2) Brawlhalla -** ${printEmoji(guild_name, varibles.BrawlHalla)} \n` +
                `**3) Fortnite -** ${printEmoji(guild_name, varibles.Fortnite)} \n` +
                `**4) osu! -** ${printEmoji(guild_name, varibles.OSU)} \n` +
                `**5) Minecraft Bedrock Edition -**  ${printEmoji(guild_name, varibles.GrassBlock)} \n` +
                `**6) Minecraft Java Edition -** ${printEmoji(guild_name, varibles.Diamond)} \n` +
                `**7) Roblox -** ${printEmoji(guild_name, varibles.Roblox)} \n` +
                `**8) Splatoon 2 -** ${printEmoji(guild_name, varibles.SplatToon2)} \n` +
                `**9) Starcraft II - **${printEmoji(guild_name, varibles.SC2)} \n` +
                `**10) Super Mario Kart 8 Deluxe -** ${printEmoji(guild_name, varibles.MK8D)} \n` +
                `**11) Super Smash Bros. Ultimate -** ${printEmoji(guild_name, varibles.Smash)} \n` +
                "\n" +

                "**NOTE: any reaction that is not stated above will not count.\n**" +
                "\n" +
                "Voting ends at 6:30 PM and Game Night starts at 7:00PM! If you have game suggestions DM a moderator \n";

                // ! this only works on the pink team server
                const sendChannel = (message.member.guild.channels.get(varibles.annoucmentChannelID)! as TextChannel);

                sendChannel.send(test).then((msg: Message)  => {
                    msg.react(printEmoji(guild_name, varibles.AnimalCrossing));
                    msg.react(printEmoji(guild_name, varibles.BrawlHalla));
                    msg.react(printEmoji(guild_name, varibles.Fortnite));
                    msg.react(printEmoji(guild_name, varibles.OSU));
                    msg.react(printEmoji(guild_name, varibles.GrassBlock));
                    msg.react(printEmoji(guild_name, varibles.Diamond));
                    msg.react(printEmoji(guild_name, varibles.Roblox));
                    msg.react(printEmoji(guild_name, varibles.SplatToon2));
                    msg.react(printEmoji(guild_name, varibles.SC2));
                    msg.react(printEmoji(guild_name, varibles.MK8D));
                    msg.react(printEmoji(guild_name, varibles.Smash));
                    msg.react(printEmoji(guild_name, varibles.Jackbox));
                    msg.react(printEmoji(guild_name, varibles.ElonMusk));
                    msg.react(printEmoji(guild_name, varibles.TrueYoov));
                })


                break;

            case 'poll':
                const output = args.slice(1).join(" ");
                message.channel.send("" + `**From**: ${message.author.username} ` + output + "").then(msg => {
                    msg.react("👍");
                    msg.react("👎");
                    msg.react("⚡");
                    msg.react(printEmoji(message.guild.name, varibles.ElonMusk));
                })
                break;

            case 'archive':

                message.channel.send("🚧 in development 🚧");
                return;

                const channel = message.channel;
                //const catigory = message;

                // @ts-ignore
                if (message.author.username != "Developer" || message.author.username != "CreW") {
                    message.channel.send("You Are Not Listed For Channel Archiving");
                    return;
                }

                //essage.channel.edit()
                break;

            case 'brooks-song':
                const song = "https://www.youtube.com/watch?v=QEGRg13xbp0&feature=youtu.be";

                message.channel.send(`!p ${song}`);

                // bot.channels.cache.array().forEach(obj => {
                //     console.log(obj.id);
                // })
                break;

            case 'test':
                printEmoji(guild_name, 'shanePog');
                break;

            case 'p':
                const url: string = args[1];

                if (url == null) {
                    message.channel.send('⛔ Please link a url ⛔');
                    return;
                }

                songs.push(url);

                console.log(songs.length);

                if (!message.member.voiceChannel) {
                    message.channel.send("You need to be in a voice channel to play music!");
                    return;
                }

                if (!message.guild.voiceConnection) {
                    message.member.voiceChannel.join().catch((err) => {
                        console.log(err);
                    })
                }

                if (!message.member.voiceChannel.connection.speaking) {
                    // @ts-ignore
                    const dispatcher = message.member.voiceChannel.connection.playStream(new ytdl(songs[0], { filter: "audioonly" }));

                    dispatcher.setVolume(volume);

                    setTimeout(() => {
                        if (songs.length == 0) {
                            setTimeout(() => {
                                disconnect();
                            }, 1);
                        } else {
                            songs.shift();
                        }
                    }, dispatcher.totalStreamTime);
                }

                console.log(url);
                break;

            case 'disconnect':
                disconnect();
                break;

            // @ts-ignore
            case 'bass-boost', 'boost', 'bass':
                const url2 = args[1];
                const vol = args[2];

                songs.push(url2);

                if (!message.member.voiceChannel) {
                    message.channel.send("You need to be in a voice channel to play music!");
                    return;
                }

                // if (!servers[message.guild.id]) servers[message.guild.id] = {
                //     queue: []
                // }

                if (!message.guild.voiceConnection) {
                    message.member.voiceChannel.join().catch((err: string) => {
                        console.log(err);
                    })
                }

                // @ts-ignore
                const dispatcher3 = message.member.voiceChannel.connection.playStream(new ytdl(songs[0], { filter: "audioonly" }));

                dispatcher3.setVolume(Number(vol));

                setTimeout(() => {
                    songs.shift();
                }, dispatcher3.totalStreamTime);

                console.log(url2);
                break;

            case 'skip':
                songs.shift();
                // @ts-ignore
                const dispatcher2 = message.member.voiceChannel.connection.playStream(new ytdl(songs[0], { filter: "audioonly" }));
                dispatcher2.setVolume(volume);

                break;

            // @ts-ignore
            case 'volume', 'vol':
                const current_vol = args[1];
                volume = Number(current_vol);

                message.channel.send('``` Volume Set To ' + volume + '```');
                break;

            case "hi":
                const author = message.author.username;
                message.channel.send(`Hello ${author}`);
                break;

            case 'update-emoji':
                fs.writeFile('./emojis.json', JSON.stringify(bot.emojis.array().toString()), (err) => {
                    if (err) {
                        console.error(err);
                        message.channel.send("```Emojis Updated Failed```");
                        message.channel.send("```" + err + "```");
                    } else {
                        message.channel.send("```Emojis Updated Successfully```");
                    }
                })
                message.channel.send("``` " + JSON.stringify(bot.emojis.array().toString()) + " ```");
                break;
        }

        // TODO: add a word filter
    } catch (err) {
        console.log(err);
    }
});

bot.on('message', message => {
    const content = message.content.toLowerCase();
    if (content.includes("when is game night")) {
        message.channel.send(backend.gameNightEmbed);
    }
})

bot.on('ready', () => {
    const port = 4040;

    console.log('ready');
    console.log('server running on port: ' + port);
    var htmlFile: any;

    fs.readFile("./public/index.html", (err, data) => {
        htmlFile = data;
    })

    http.createServer(function(req, res) {

        switch (req.url) {
            // server is working
            case "/isrunning":
                res.write("Server is Running");
                res.end();
                break;


            default:
                res.write(htmlFile);
                res.end();
                break;
        }

    }).listen(port); //the server object listens on port 4040

    bot.user.setPresence({
        game: {
            name: '_help',
            type: "LISTENING"
        }
    })
});

bot.login(process.env.TOKEN);