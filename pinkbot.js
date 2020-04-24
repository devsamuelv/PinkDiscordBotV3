const backend = require('./backend/ts/embeds');
const varibles = require('./backend/ts/varibles');

// * get dependency's
const fs = require('fs');
const http = require('http');
// const os = require("os");
// const schedule = require('node-schedule');

var init = true;

require('dotenv').config();

let discord = require('discord.js');
let bot = new discord.Client();
const prefix = '_';

// ? 14 for 2 

const badnames = ['pipebomb', 'pipe bomb', 'bomb', 'weed', 'pp small'];

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
                message.channel.send("Commands: _meme, _help, _hi, _ban");
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

                //     // * this is only for game night finish announcement
                // case 'voting-finish':
                //     var myArgs = args.slice(1).join(" ");
                //     const sendChannel2 = message.member.guild.channels.get(varibles.annoucmentChannelID);

                //     const content =
                //         "@everyone voting is now over so tonight we are playing " + myArgs;

                //     sendChannel2.send(content);
                //     break;


            case 'game-night':
                console.log(message.guild.roles);
                const test =
                    `${message.guild.roles.get(varibles.GameNight)} When you get a chance, please vote for the other games we will be playing. \n`

                +"\n" +
                "Remember, Jackbox games are going to be played anyways unless \n"

                +
                `the majority does not want to play. ${printEmoji(varibles.Jackbox)} \n`

                +
                "\n" +
                `- Minecraft Java/Bedrock ${printEmoji(varibles.GrassBlock)} \n` +

                `- Roblox ${printEmoji(varibles.Roblox)} \n` +

                `- Super Smash Bros. Ultimate ${printEmoji(varibles.Smash)} \n` +

                `- Fortnite. ${printEmoji(varibles.Fortnite)} \n` +
                "\n" +

                "If you have game suggestions DM a moderator. \n"

                +
                "\n" +
                "Voting ends at 6:30 PM! **NOTE: any reaction that is not stated above will not count.** \n";

                // ! this only works on the pink team server
                const sendChannel = message.member.guild.channels.get(varibles.annoucmentChannelID);
                sendChannel.send(test).then(msg => {
                    msg.react(printEmoji(varibles.Roblox));
                    msg.react(printEmoji(varibles.Fortnite));
                    msg.react(printEmoji(varibles.GrassBlock));
                    msg.react(printEmoji(varibles.Smash));
                    msg.react(printEmoji(varibles.ElonMusk));
                })


                break;

            case 'poll':
                const output = args.slice(1).join("");
                message.channel.send(output).then(msg => {
                    msg.react("👍");
                    msg.react("👎");
                    msg.react("⚡")
                })
                break;


            case "hi":
                const author = message.author.username;
                message.channel.send(`Hello ${author}`);
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

            var data2;

            fs.readFile("./backend/logs.txt", (err, data) => {

                if (err) {
                    return console.log(err);
                }
            })

            fs.writeFile("./backend/logs.txt", data2, (err) => {
                if (err) {
                    return console.log(err);
                }
            })

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

    }).listen(8080); //the server object listens on port 8080

    bot.user.setPresence({
        game: {
            name: "_help",
            type: 2
        }
    })
});

bot.login(process.env.TOKEN);

// * functions here 
function printEmoji(ID) {
    return bot.emojis.get(ID);
}