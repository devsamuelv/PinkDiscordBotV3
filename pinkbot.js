let discord = require('discord.js');
const fs = require('fs');
const firebase = require('firebase');
const http = require('http');
const os = require("os");
const systemInfo = require("systeminformation");
require('dotenv').config();

let bot = new discord.Client();
const prefix = '_';
const Botlogo = "https://cdn.discordapp.com/app-icons/632687408793780275/4885fa093e2c818de8b830d1a6cf857b.png";

firebase.initializeApp({
    apiKey: "AIzaSyACX60OfX5FE3T6Kr1kBw_lZqqILu8DYmM",
    authDomain: "pinkteamb.firebaseapp.com",
    databaseURL: "https://pinkteamb.firebaseio.com",
    projectId: "pinkteamb",
    storageBucket: "pinkteamb.appspot.com",
    messagingSenderId: "542368478810",
    appId: "1:542368478810:web:987f2ae3e30515c64fca63"
});

const firestore = firebase.firestore();
const sysCollection = firestore.collection("sys");

const mods = ["Developer", "Bradley", "Dr0verbuild"];

const badnames = ['pipebomb', 'pipe bomb', 'bomb', 'weed', 'pp small'];

// for commands and moderation
bot.on('message', message => {
    const args = message.content.substr(prefix.length).split(' ');

    if (message.content.includes(badnames)) {
        message.channel.delete();
    }

    try {
        // put all messages in the try function to catch errors

        switch (args[0]) {
            case "meme":
                // work on this later
                message.channel.send("Sending Memes");
                break;

            case "help":
                message.channel.send("Commands: _meme, _help, _hi, _ban");
                break;

                // fix banning its not getting the command
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
                    const errEmbed = new discord.RichEmbed({
                        author: {
                            name: "Pinky",
                            icon_url: Botlogo
                        },
                        title: "Incorrect Permissions",
                        description: "Im Sorry you dont have Moderator Permissions",
                        color: 11111111
                    })
                    message.channel.send(errEmbed);
                }

                break;

            case "hi":
                const author = message.author.username;
                message.channel.send(`Hello ${author}`);
                break;
        }

        if (message.author.username == "Diamonddunkers") {
            if (message.channel.name != 'memes') {
                message.delete();
                // add strike??
                console.log(message.content);
            }
        } else {
            // console.log('\033[49m');

            console.log('\033[31m');
            const spacer = "=============================================";
            console.log(`${new Date} \n ` + '\033[34m' + `${message.author.username}` + '\033[39m' + ` is not blacklisted \n${spacer}`);
            console.log('\033[39m');

            var data2;

            fs.readFile("./backend/logs.txt", (err, data) => {

                if (err) {
                    return console.log(err);
                }

                sysCollection.doc("temp").get().then(payload => {
                    const data2 = `${new Date} ${message.author.username} is not blacklisted \n` + payload.data().log;

                    const dataFile = {
                        log: data2,
                        sysname: os.platform(),
                    }

                    sysCollection.doc('temp').set(dataFile, { merge: true });
                })
            })

            fs.writeFile("./backend/logs.txt", data2, (err) => {
                if (err) {
                    return console.log(err);
                }
            })

            // var cpu;
            // var ram;
            // var sysname;

            // systemInfo.cpuTemperature().then((data) => {
            //     cpu = data;
            // })

            // systemInfo.mem().then((data) => {
            //     ram = data;
            // })

            // systemInfo.system().then((data) => {
            //     sysname = data;
            // })

            const datainfo = {
                log: data2,
            }

            // sysCollection.doc("temp").set(datainfo, { merge: true });
        }
    } catch (err) {
        // nothing here
        console.log(err);
    }
});


bot.on('message', message => {
    const content = message.content.toLowerCase();

    if (content.includes("when is game night")) {
        const gameNightEmbed = new discord.RichEmbed({
            author: {
                name: "Pinky",
                icon_url: Botlogo
            },
            title: "Game Night Info",
            description: "⌚Game Night is on Fridays At 7pm⌚",
            color: 11111111
        })
        message.channel.send(gameNightEmbed);
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
    var cssFile;
    var jsfile;

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
            case "/admin":
                res.write("index.css");
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