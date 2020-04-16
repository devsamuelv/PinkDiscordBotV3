const backend = require('./backend/ts/embeds');
const varibles = require('./backend/ts/varibles');

const fs = require('fs');
const firebase = require('firebase');
const http = require('http');
const os = require("os");
require('dotenv').config();

let discord = require('discord.js');

let bot = new discord.Client();
const prefix = '_';

firebase.initializeApp({
    apiKey: "AIzaSyACX60OfX5FE3T6Kr1kBw_lZqqILu8DYmM",
    authDomain: "pinkteamb.firebaseapp.com",
    databaseURL: "https://pinkteamb.firebaseio.com",
    projectId: "pinkteamb",
    storageBucket: "pinkteamb.appspot.com",
    messagingSenderId: "542368478810",
    appId: "1:542368478810:web:987f2ae3e30515c64fca63"
});

// TODO add a spam function

// firestore stuff
const firestore = firebase.firestore();
const sysCollection = firestore.collection("sys");


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

                // // * this is in development
                // case 'spamm':
                //     const MentionedUser = message.mentions.users.first();
                //     const message = args[2];

                //     if (MentionedUser == null) { message.channel.send("Please Mention a user."); return; }

                //     for (var x = 0; x > 5; x++) {
                //         console.log(message);
                //     }



                //     break;


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
                    const log = payload.data().log;

                    const dataFile = {
                        log: log + 1,
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
            case "/isup":
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