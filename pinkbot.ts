import { Client, Message, Emoji, TextChannel, MessageEmbed, RichEmbed, VoiceChannel, StreamOptions, StreamDispatcher } from 'discord.js';
import * as backend from './backend/ts/embeds';
import * as varibles from './backend/ts/varibles';
import * as teamapp from './backend/ts/web/teamapp/teamapp';

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
    const video_links = [
        "https://www.youtube.com/watch?v=0TbObNMXj2E",
        "https://www.youtube.com/watch?v=WwhzLBvK5VE",
        "https://www.youtube.com/watch?v=AAuZlHuX2cY",
        "https://www.youtube.com/watch?v=9J8lKV9fJ2I",
        "https://www.youtube.com/watch?v=mOsy7vEod5o",
        "https://www.youtube.com/watch?v=Cs3dIYF0VqI",
        "https://www.youtube.com/watch?v=yGirw07NWlQ",
        "https://www.youtube.com/watch?v=NmD3AFlKjf4",
        "https://www.youtube.com/watch?v=6FnfVAX2lBE",
        "https://www.youtube.com/watch?v=VYY4WivkpUI",
        "https://www.youtube.com/watch?v=7OEOuKjIyJg",
        "https://www.youtube.com/watch?v=ZQXYocKlOY8",
        "https://www.youtube.com/watch?v=ZhNOr3_L4mo",
        "https://www.youtube.com/watch?v=lPvo_zZ_6fI",
        "https://www.youtube.com/watch?v=NOKl4iR3aJc",
        "https://www.youtube.com/watch?v=DMEcl6P3hjQ",
    ];

    if (message.author.username == "rape cures autism") {
        message.delete();
    }

    video_links.forEach((url) => { 
        if (message.content.includes(url)) {
            console.log("delete")
            if (message.deletable) {
                message.delete();

                message.guild.channels.forEach((channel) => {
                    if (channel.type === "voice") {
                        message.guild.members.forEach((member) => {
                            if (member.user.username === "Rythm") {
                                setTimeout(() => {
                                    member.setVoiceChannel(null);
                                }, 1000);

                                setTimeout(() => {
                                    member.setVoiceChannel(null);
                                }, 1000);

                                setTimeout(() => {
                                    member.setVoiceChannel(null);
                                }, 1000);
                            }
                        })
                    }
                })
            }
        } 
    })

    // * varibles here
    // console.log(message.guild);
    const guild_name = message.guild.id;

    // * functions here 

    if (!message.content.startsWith(prefix, 0)) {
        console.log(`${message.content.startsWith(prefix, 0)}`);
        return;
    }

    const args = message.content.substr(prefix.length).split(' ');

    function disconnect() {
        const channelID = message.member.voiceChannel.id;

        bot.voiceConnections.forEach((channel) => {
            if (channel.channel.id == channelID) {
                channel.disconnect();

                message.channel.send("Disconnected From " + channel.channel.name);
            }
        })
    }

    function printEmoji(guild: string, EmojiName: string): Emoji {
        var EmojiID = "";
    
        bot.emojis.forEach((emoji) => {
            if (emoji.name == EmojiName) {
                EmojiID = emoji.id;
            }
        })
        
        // ! is to trust it is not null
        return new Emoji(bot.guilds.get(guild)!, bot.emojis.get(EmojiID)!);
    }

    try {
        // put all messages in the try function to catch errors
        switch (args[0]) {
            case "meme":
                // todo work on this later
                message.channel.send("Sending Memes");

                varibles.Memes.forEach((emoji: string) => {
                    message.channel.send(printEmoji(guild_name, emoji));
                })

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

                sendChannel.send(test).then((msg: Message) => {
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

            case 'test-game-night':
                // ! fix this 
                /* 
                todo add pink color
                todo add the ╔ ═ ║ ╚ 
                todo add geen and black for the color FOR A PRANK  
                todo add tables for the games
 
                */

                message.channel.send(`${message.guild.roles.get(varibles.GameNight)}`);

                const testMessage = new RichEmbed({
                    color: 0x0099ff,
                    title: 'Some title',
                    author: {
                        name: 'Pinky',
                        icon_url: 'https://i.imgur.com/wSTFkRM.png',
                        url: 'https://discord.js.org',
                    },
                    description: 
                        `Alright, its time to vote for this week's Game Night! Please, vote for the games you want to play! Also, please only vote if you will play said game(s)! We have had people messing up the vote because they don't play but vote anyways, and it is hard to decide what to do. \n`

                        +"\n" +
                        "**Please note:** Jackbox games will be played every week unless the majority does not want to play. \n"
        
                        +
                        `If you do not want to play any Jackbox games, please vote with ${printEmoji(guild_name, varibles.Jackbox)} \n`,
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
                teamapp.postEvents(bot);
                break;

            case 'p':
                if (!message.content.startsWith(prefix, 0)) { return; }

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

                // @ts-ignore
                const dispatcher = message.member.voiceChannel.connection.playStream(new ytdl(songs[0], { filter: "audioonly" }), "video");

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

            case "uptime":
                message.channel.send(bot.uptime.toString());
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

var guild_run_once = "";
bot.on('guildMemberUpdate', (old, newMember) => {
    const member = newMember;
    
    if (member.displayName.toLowerCase().includes("pipebomb") || member.displayName.toLowerCase().includes("weed") && guild_run_once !== member.user.username) {
        console.log("{Sending User Message}: " + member.user.username + " Because his nickname is " + member.displayName + " ")

        member.send(":octagonal_sign: :hand_splayed: "+ member.user.username +" Please Change You Name Back to "+ old.displayName +" a Modorator Will contact you! :octagonal_sign: ")
        guild_run_once = member.user.username;
    }

    setTimeout(() => {
        guild_run_once = "";
    }, 5000);
})

var run = true;
bot.on('message', message => {
    const content = message.content.toLowerCase(); 
    if (content.includes("when is game night")) {

        setTimeout(() => {
            run = true;
        }, 1000)
    
        if (run === false) { return; }

        message.channel.send(backend.gameNightEmbed);
    }

    run = false;

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
                res.write("✅ Server is Running ✅");
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