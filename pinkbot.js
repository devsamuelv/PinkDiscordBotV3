"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var backend = __importStar(require("./backend/ts/embeds"));
var varibles = __importStar(require("./backend/ts/varibles"));
var teamapp = __importStar(require("./backend/ts/web/teamapp/teamapp"));
var ytdl = __importStar(require("ytdl-core"));
var http = __importStar(require("http"));
var dotenv = __importStar(require("dotenv"));
var fs = __importStar(require("fs"));
//const emoji = require('emoji.json');
var bot = new discord_js_1.Client();
var prefix = '_';
var badnames = ['pipebomb', 'pipe bomb', 'bomb', 'weed', 'pp small'];
var volume = 1;
dotenv.config();
var servers = {};
var songs = [];
// for commands and moderation
bot.on('message', function (message) {
    // * varibles here
    var guild_name = message.guild.name;
    // * functions here 
    if (!message.content.startsWith(prefix, 0)) {
        console.log("" + message.content.startsWith(prefix, 0));
        return;
    }
    console.log('test');
    var args = message.content.substr(prefix.length).split(' ');
    function disconnect() {
        var channelID = message.member.voiceChannel.id;
        bot.voiceConnections.forEach(function (channel) {
            if (channel.channel.id == channelID) {
                channel.disconnect();
                message.channel.send("Disconnected From " + channel.channel.name);
            }
        });
    }
    function printEmoji(guild, EmojiName) {
        var EmojiID = "";
        bot.emojis.forEach(function (emoji) {
            if (emoji.name == EmojiName) {
                EmojiID = emoji.id;
            }
        });
        // ! is to trust it is not null
        return new discord_js_1.Emoji(bot.guilds.get(guild), bot.emojis.get(EmojiID));
    }
    try {
        // put all messages in the try function to catch errors
        switch (args[0]) {
            case "meme":
                // todo work on this later
                message.channel.send("Sending Memes");
                varibles.Memes.forEach(function (emoji) {
                    message.channel.send(printEmoji(guild_name, emoji));
                });
                break;
            case "help":
                message.channel.send("Commands: _meme, _help, _hi, _ban, _update-emoji, _bass-boost <url> <boost level>, disconnect");
                break;
            // ! fix banning its not getting the command
            case "ban":
                var banUser_1 = message.mentions.users.first();
                var banMessage = args[2];
                if (banUser_1.username == null) {
                    message.channel.send("Please Enter a username.");
                    return;
                }
                if (message.member.roles.some(function (roles) { return roles.name === "Moderator"; })) {
                    message.guild.member(banUser_1).ban(banMessage).then(function () {
                        message.channel.send("the user " + banUser_1 + " was banned");
                    }).catch(function (err) {
                        message.channel.send("Error User Not Banned " + err);
                    });
                }
                else {
                    message.channel.send(backend.ErrEmbed);
                }
                break;
            case 'game-night':
                var test = message.guild.roles.get(varibles.GameNight) + " Alright, its time to vote for this week's Game Night! Please, vote for the games you want to play! Also, please only vote if you will play said game(s)! We have had people messing up the vote because they don't play but vote anyways, and it is hard to decide what to do. \n"
                    + "\n" +
                    "**Please note:** Jackbox games will be played every week unless the majority does not want to play. \n"
                    +
                        ("If you do not want to play any Jackbox games, please vote with " + printEmoji(guild_name, varibles.Jackbox) + " \n")
                    +
                        "\n" +
                    ("**1) Animal Crossing: New Horizons -** " + printEmoji(guild_name, varibles.AnimalCrossing) + " \n") +
                    ("**2) Brawlhalla -** " + printEmoji(guild_name, varibles.BrawlHalla) + " \n") +
                    ("**3) Fortnite -** " + printEmoji(guild_name, varibles.Fortnite) + " \n") +
                    ("**4) osu! -** " + printEmoji(guild_name, varibles.OSU) + " \n") +
                    ("**5) Minecraft Bedrock Edition -**  " + printEmoji(guild_name, varibles.GrassBlock) + " \n") +
                    ("**6) Minecraft Java Edition -** " + printEmoji(guild_name, varibles.Diamond) + " \n") +
                    ("**7) Roblox -** " + printEmoji(guild_name, varibles.Roblox) + " \n") +
                    ("**8) Splatoon 2 -** " + printEmoji(guild_name, varibles.SplatToon2) + " \n") +
                    ("**9) Starcraft II - **" + printEmoji(guild_name, varibles.SC2) + " \n") +
                    ("**10) Super Mario Kart 8 Deluxe -** " + printEmoji(guild_name, varibles.MK8D) + " \n") +
                    ("**11) Super Smash Bros. Ultimate -** " + printEmoji(guild_name, varibles.Smash) + " \n") +
                    "\n" +
                    "**NOTE: any reaction that is not stated above will not count.\n**" +
                    "\n" +
                    "Voting ends at 6:30 PM and Game Night starts at 7:00PM! If you have game suggestions DM a moderator \n";
                // ! this only works on the pink team server
                var sendChannel = message.member.guild.channels.get(varibles.annoucmentChannelID);
                sendChannel.send(test).then(function (msg) {
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
                });
                break;
            case 'test-game-night':
                // ! fix this 
                /*
                todo add pink color
                todo add the ╔ ═ ║ ╚
                todo add geen and black for the color FOR A PRANK
                todo add tables for the games
 
                */
                message.channel.send("" + message.guild.roles.get(varibles.GameNight));
                var testMessage = new discord_js_1.RichEmbed({
                    color: 0x0099ff,
                    title: 'Some title',
                    author: {
                        name: 'Pinky',
                        icon_url: 'https://i.imgur.com/wSTFkRM.png',
                        url: 'https://discord.js.org',
                    },
                    description: "Alright, its time to vote for this week's Game Night! Please, vote for the games you want to play! Also, please only vote if you will play said game(s)! We have had people messing up the vote because they don't play but vote anyways, and it is hard to decide what to do. \n"
                        + "\n" +
                        "**Please note:** Jackbox games will be played every week unless the majority does not want to play. \n"
                        +
                            ("If you do not want to play any Jackbox games, please vote with " + printEmoji(guild_name, varibles.Jackbox) + " \n"),
                    thumbnail: {
                        url: 'https://i.imgur.com/wSTFkRM.png',
                    },
                    fields: [
                        {
                            name: 'Regular field title',
                            value: 'Some value here',
                        },
                        {
                            name: 'Inline field title',
                            value: 'Some value here',
                        },
                        {
                            name: 'Inline field title',
                            value: 'Some value here',
                        },
                        {
                            name: 'Inline field title',
                            value: 'Some value here',
                        },
                    ],
                    image: {
                        url: 'https://i.imgur.com/wSTFkRM.png',
                    },
                    timestamp: new Date(),
                    footer: {
                        text: 'Some footer text here',
                        icon_url: 'https://i.imgur.com/wSTFkRM.png',
                    },
                });
                message.channel.send(testMessage);
                break;
            case 'poll':
                var output = args.slice(1).join(" ");
                message.channel.send("" + ("**From**: " + message.author.username + " ") + output + "").then(function (msg) {
                    msg.react("👍");
                    msg.react("👎");
                    msg.react("⚡");
                    msg.react(printEmoji(message.guild.name, varibles.ElonMusk));
                });
                break;
            case 'archive':
                message.channel.send("🚧 in development 🚧");
                return;
                var channel = message.channel;
                //const catigory = message;
                // @ts-ignore
                if (message.author.username != "Developer" || message.author.username != "CreW") {
                    message.channel.send("You Are Not Listed For Channel Archiving");
                    return;
                }
                //essage.channel.edit()
                break;
            case 'brooks-song':
                var song = "https://www.youtube.com/watch?v=QEGRg13xbp0&feature=youtu.be";
                message.channel.send("!p " + song);
                // bot.channels.cache.array().forEach(obj => {
                //     console.log(obj.id);
                // })
                break;
            case 'test':
                teamapp.postEvents(bot);
                break;
            case 'p':
                if (!message.content.startsWith(prefix, 0)) {
                    return;
                }
                var url = args[1];
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
                    message.member.voiceChannel.join().catch(function (err) {
                        console.log(err);
                    });
                }
                if (!message.member.voiceChannel.connection.speaking) {
                    // @ts-ignore
                    var dispatcher = message.member.voiceChannel.connection.playStream(new ytdl(songs[0], { filter: "audioonly" }));
                    dispatcher.setVolume(volume);
                    setTimeout(function () {
                        if (songs.length == 0) {
                            setTimeout(function () {
                                disconnect();
                            }, 1);
                        }
                        else {
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
            case ('bass-boost', 'boost', 'bass'):
                var url2 = args[1];
                var vol = args[2];
                songs.push(url2);
                if (!message.member.voiceChannel) {
                    message.channel.send("You need to be in a voice channel to play music!");
                    return;
                }
                if (!message.guild.voiceConnection) {
                    message.member.voiceChannel.join().catch(function (err) {
                        console.log(err);
                    });
                }
                // @ts-ignore
                var dispatcher3 = message.member.voiceChannel.connection.playStream(new ytdl(songs[0], { filter: "audioonly" }));
                dispatcher3.setVolume(Number(vol));
                setTimeout(function () {
                    songs.shift();
                }, dispatcher3.totalStreamTime);
                console.log(url2);
                break;
            case 'skip':
                songs.shift();
                // @ts-ignore
                var dispatcher2 = message.member.voiceChannel.connection.playStream(new ytdl(songs[0], { filter: "audioonly" }));
                dispatcher2.setVolume(volume);
                break;
            // @ts-ignore
            case ('volume', 'vol'):
                var current_vol = args[1];
                volume = Number(current_vol);
                message.channel.send('``` Volume Set To ' + volume + '```');
                break;
            case "hi":
                var author = message.author.username;
                message.channel.send("Hello " + author);
                break;
            case 'update-emoji':
                fs.writeFile('./emojis.json', JSON.stringify(bot.emojis.array().toString()), function (err) {
                    if (err) {
                        console.error(err);
                        message.channel.send("```Emojis Updated Failed```");
                        message.channel.send("```" + err + "```");
                    }
                    else {
                        message.channel.send("```Emojis Updated Successfully```");
                    }
                });
                message.channel.send("``` " + JSON.stringify(bot.emojis.array().toString()) + " ```");
                break;
        }
        // TODO: add a word filter
    }
    catch (err) {
        console.log(err);
    }
});
bot.on('guildMemberUpdate', function (old, newMember) {
    var member = newMember;
    if (member.displayName.toLowerCase().includes("pipebomb") || member.displayName.toLowerCase().includes("weed")) {
        if (member.kickable) {
            console.log("{Banning User}: " + member.user.username + " Because his nickname is " + member.displayName + " ");
            member.guild.member(member.user).kick("Your Name Is Not Allowed").then(function (d) {
                console.log(d);
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
});
var run = true;
bot.on('message', function (message) {
    var content = message.content.toLowerCase();
    if (content.includes("when is game night")) {
        setTimeout(function () {
            run = true;
        }, 1000);
        if (run === false) {
            return;
        }
        message.channel.send(backend.gameNightEmbed);
    }
    run = false;
});
bot.on('ready', function () {
    var port = 4040;
    console.log('ready');
    console.log('server running on port: ' + port);
    var htmlFile;
    fs.readFile("./public/index.html", function (err, data) {
        htmlFile = data;
    });
    http.createServer(function (req, res) {
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
    });
});
bot.login(process.env.TOKEN);
