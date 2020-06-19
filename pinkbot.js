const backend = require('./backend/ts/embeds');
const varibles = require('./backend/ts/varibles');
const ytdl = require('ytdl-core');
const ytScraper = require("yt-scraper");

// * get dependency's
const fs = require('fs');
const http = require('http');
const puppeteer = require('puppeteer');
// const os = require("os");
// const schedule = require('node-schedule');

var init = true;

require('dotenv').config();

let discord = require('discord.js');
let bot = new discord.Client();
const prefix = '_';

// ? 14 for 2 

const badnames = ['pipebomb', 'pipe bomb', 'bomb', 'weed', 'pp small'];
var volume = 1;

var servers = {};

var songs = {
    queue: []
};

// for commands and moderation
bot.on('message', message => {
    // if (init == true) {
    //     schedule.scheduleJob('* 59 22 * * *', () => {
    //         console.log(message.guild.roles);
    //         const test =
    //             `${message.guild.roles.get(varibles.GameNight)} Ok people its game night once again! I am taking Jackbox games out of the vote because, well, its the best game and we play it every time so it will now be a guaranteed game each week for now on unless otherwise stated ${printEmoji(varibles.Jackbox)} . \n`

    //         +"\n" +
    //         "We are also setting an official time for Jackbox games to have our family friendly policy lifted each night. We will all play under the same name and not give hints as to who is playing until after each game is done, so people that play will not play under any pressure or judgment. This time will start at 9:30 PM unless otherwise stated. \n"

    //         +
    //         "\n" +
    //         "When you get a chance, please vote for the other games we will be playing tomorrow! Remember, Jackbox games are going to be played anyways unless the majority does not want to play. \n"

    //         +
    //         "\n" +
    //         `- Minecraft Java/Bedrock ${printEmoji(varibles.GrassBlock)} \n` +

    //         `- Roblox ${printEmoji(varibles.Roblox)} \n` +

    //         `- Super Smash Bros. Ultimate ${printEmoji(varibles.Smash)} \n` +

    //         `- Fortnite. ${printEmoji(varibles.Fortnite)} \n` +
    //         "\n" +

    //         "If you have game suggestions DM a moderator. \n"

    //         +
    //         "\n" +
    //         "Voting ends at 6:30 PM tomorrow! **NOTE: any reaction that is not stated above will not count.** \n";

    //         // ! this only works on the pink team server
    //         const sendChannel = message.member.guild.channels.get(varibles.testingChannelID);
    //         sendChannel.send(test).then(msg => {
    //             msg.react(printEmoji(varibles.Roblox));
    //             msg.react(printEmoji(varibles.Fortnite));
    //             msg.react(printEmoji(varibles.GrassBlock));
    //             msg.react(printEmoji(varibles.Smash));
    //         })
    //     })
    // }

    const args = message.content.substr(prefix.length).split(' ');

    if (message.content.includes(badnames)) {
        message.channel.delete();
    }

    try {
        // put all messages in the try function to catch errors
        switch (args[0]) {
            case "meme":
                // todo work on this later
                message.channel.send("Sending Memes");
                break;

            case "help":
                message.channel.send("Commands: _meme, _help, _hi, _ban, _update-emoji, _bass-boost <url> <boost level>");
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
                console.log(message.guild.roles);
                const test =
                    `${message.guild.roles.get(varibles.GameNight)} Alright, its time to vote for this week's Game Night! Please, vote for the games you want to play! Also, please only vote if you will play said game(s)! We have had people messing up the vote because they don't play but vote anyways, and it is hard to decide what to do. \n`

                +"\n" +
                "**Please note:** Jackbox games will be played every week unless the majority does not want to play. \n"

                +
                `If you do not want to play any Jackbox games, please vote with ${printEmoji(varibles.Jackbox)} \n`

                +
                "\n" +
                `**1) Animal Crossing: New Horizons -** ${printEmoji(varibles.AnimalCrossing)} \n` +
                `**2) Brawlhalla -** ${printEmoji(varibles.BrawlHalla)} \n` +
                `**3) Fortnite -** ${printEmoji(varibles.Fortnite)} \n` +
                `**4) osu! -** ${printEmoji(varibles.OSU)} \n` +
                `**5) Minecraft Bedrock Edition -**  ${printEmoji(varibles.GrassBlock)} \n` +
                `**6) Minecraft Java Edition -** ${printEmoji(varibles.Diamond)} \n` +
                `**7) Roblox -** ${printEmoji(varibles.Roblox)} \n` +
                `**8) Splatoon 2 -** ${printEmoji(varibles.SplatToon2)} \n` +
                `**9) Starcraft II - **${printEmoji(varibles.SC2)} \n` +
                `**10) Super Mario Kart 8 Deluxe -** ${printEmoji(varibles.MK8D)} \n` +
                `**11) Super Smash Bros. Ultimate -** ${printEmoji(varibles.Smash)} \n` +
                "\n" +

                "**NOTE: any reaction that is not stated above will not count.\n**" +
                "\n" +
                "Voting ends at 6:30 PM and Game Night starts at 7:00PM! If you have game suggestions DM a moderator \n";

                // ! this only works on the pink team server
                const sendChannel = message.member.guild.channels.get(varibles.testingChannelID);
                sendChannel.send(test).then(msg => {
                    msg.react(varibles.AnimalCrossing);
                    msg.react(varibles.BrawlHalla);
                    msg.react(varibles.Fortnite);
                    msg.react(varibles.OSU);
                    msg.react(varibles.GrassBlock);
                    msg.react(varibles.Diamond);
                    msg.react(varibles.Roblox);
                    msg.react(varibles.SplatToon2);
                    msg.react(varibles.SC2);
                    msg.react(varibles.MK8D);
                    msg.react(varibles.Smash);
                    msg.react(varibles.Jackbox);
                    msg.react(varibles.ElonMusk);
                    msg.react(varibles.TrueYoov);
                })


                break;

            case 'poll':
                const output = args.slice(1).join(" ");
                message.channel.send("" + `**From**: ${message.author.username} ` + output + "").then(msg => {
                    msg.react("👍");
                    msg.react("👎");
                    msg.react("⚡");
                    msg.react(printEmoji(varibles.ElonMusk));
                })
                break;

                // case 'archive':
                //     const channel = message.channel;

                //     if (message.author.username != "Developer" || message.author.username != "CreW") {
                //         message.channel.send("You Are Not Listed For Channel Archiving");
                //         return;
                //     }

                //     message.channel.edit(discord.GuildChannelManager)
                //     break;

            case 'brooks-song':
                // const song = "https://www.youtube.com/watch?v=QEGRg13xbp0&feature=youtu.be";
                // //const ch = message.member.guild.channels.get(varibles.testingChannelID);
                // bot.channels.cache.array().forEach(obj => {
                //     console.log(obj.id);
                // })
                break;

            case 'play', 'p':
                const url = args[1];

                songs.queue.push(url);

                if (!message.member.voiceChannel) {
                    message.channel.send("You need to be in a voice channel to play music!");
                    return;
                }

                if (!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                }

                if (!message.guild.voiceConnection) {
                    message.member.voiceChannel.join().then((connection2) => {
                        var server = servers[message.guild.id];
                    }).catch((err) => {
                        console.log(err);
                    })
                }

                if (!message.member.voiceChannel.connection.speaking) {
                    const dispatcher = message.member.voiceChannel.connection.playStream(ytdl(songs.queue[0], { filter: "audioonly" }));

                    dispatcher.setVolume(volume);
                }

                setTimeout(() => {
                    songs.queue.shift();
                }, dispatcher.streamTime);

                console.log(url);
                break;

            case 'bass-boost', 'boost', 'bass':
                const url2 = args[1];
                const vol = args[2];

                songs.queue.push(url2);

                if (!message.member.voiceChannel) {
                    message.channel.send("You need to be in a voice channel to play music!");
                    return;
                }

                if (!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                }

                if (!message.guild.voiceConnection) {
                    message.member.voiceChannel.join().then((connection2) => {
                        var server = servers[message.guild.id];
                    }).catch((err) => {
                        console.log(err);
                    })
                }

                const dispatcher3 = message.member.voiceChannel.connection.playStream(ytdl(songs.queue[0], { filter: "audioonly" }));

                dispatcher3.setVolume(vol);

                setTimeout(() => {
                    songs.queue.shift();
                }, dispatcher.streamTime);

                console.log(url2);
                break;

            case 'skip':
                songs.queue.shift();
                const dispatcher2 = message.member.voiceChannel.connection.playStream(ytdl(songs.queue[0], { filter: "audioonly" }));
                dispatcher2.setVolume(volume);

                break;

            case 'volume', 'vol':
                const current_vol = args[1];
                volume = current_vol;

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

        if (message.author.username == "Diamonddunkers") {
            if (message.channel.name != 'memes') {
                message.delete();
                // add strike??
                console.log(message.content);
            }
        } else {
            console.log('\033[31m');
            const spacer = "=============================================";
            console.log(`${new Date} \n ` + '\033[34m' + `${message.author.username}` + '\033[39m' + ` is not blacklisted \n${spacer}`);
            console.log('\033[39m');
        }
    } catch (err) {
        // nothing here
        console.log(err);
    }
});

bot.on('message', message => {
    const content = message.content.toLowerCase();
    if (content.includes("when is game night")) {
        message.channel.send(backend.gameNightEmbed);
    }
})

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => {
        ch.name === "system-messages"
    });

    if (!channel) { return; }

    channel.sendMessage(`Welcome to the server, @${member}`);
})

bot.on('ready', () => {
    console.log('ready');
    var htmlFile;

    fs.readFile("./public/index.html", (err, data) => {
        htmlFile = data;
    })

    fs.readFile("./public/index.css", (err, data) => {
        cssFile = data;
    })

    fs.readFile("./public/index.js", (err, data) => {
        jsfile = data;
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

    }).listen(4040); //the server object listens on port 4040

    bot.user.setPresence({
        game: {
            name: '_help',
            type: 2
        }
    })
});

bot.login(process.env.TOKEN);

// * functions here 
function printEmoji(Name) {
    return bot.emojis.cache.get(Name);
}