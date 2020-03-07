let discord = require('discord.js');
var fs = require('fs');
require('dotenv').config();
const firebase = require('firebase');
// require('http').createServer().listen(3000); // only for api's the require a port num

let bot = new discord.Client();
const prefix = '_';

const version = "0.1.0";

firebase.initializeApp({
    apiKey: "AIzaSyACX60OfX5FE3T6Kr1kBw_lZqqILu8DYmM",
    authDomain: "pinkteamb.firebaseapp.com",
    databaseURL: "https://pinkteamb.firebaseio.com",
    projectId: "pinkteamb",
    storageBucket: "pinkteamb.appspot.com",
    messagingSenderId: "542368478810",
    appId: "1:542368478810:web:987f2ae3e30515c64fca63"
});

var firestore = firebase.firestore();

var configCollection = firestore.collection('config');
var doc = firestore.collection('/config').doc('/0PLo2AWvg2UGwfFMTK2U');

doc.onSnapshot(async function(doc) {
    await bot.user.setPresence({
        game: {
            name: doc.data().statName,
            type: doc.data().statNumber,
        }
    })
})

const badnames = ['pipebomb', 'pipe bomb', 'bomb', 'weed', 'pp small'];

bot.on('message', message => {
    const args = message.content.substr(prefix.length).split(' ');

    if (message.content.includes(badnames)) {
        message.channel.delete();
    }

    try { 
        // put all messages in the try function to catch errors

        switch (args[0]) {
            case "meme":
                message.channel.send("Sending Memes");
            break;

            case "help":
                message.channel.send("Commands: meme, help");
        }

        if (message.author.username == "Diamonddunkers") {
            if (message.channel.name != 'memes') {
                message.delete();
                // add strike??
                console.log(message.content);
            }
        } else {
            console.log('\033[49m');

            console.log('\033[31m');
            const spacer = "=============================================";
            console.log(`${new Date} \n ` + '\033[34m' + `${message.author.username}` + '\033[39m' + ` is not blacklisted \n${spacer}`);
            console.log('\033[39m');
        }
    } catch (err) {
        // var fileData = fs.readFileSync('log.txt', 'utf8');

        // fs.writeFile('log.txt', `\n${fileData} \n ${new Date} \n ${err}`);
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => {
        ch.name === 'system-messages'
    });

    if (!channel) { return; }

    channel.sendMessage(`Welcome to the server, @${member}`);
})

bot.on('ready', () => {
    console.log('ready');
    // bot.user.setPresence({
    //     game: {
    //         name: "🎧the chat🎧",
    //         type: 2
    //     }
    // })
    // bot.user.setPresence({
    //     game: {
    //         name: "🎧 the chat 🎧",
    //         type: 2
    //     }
    // })
});

bot.login(process.env.TOKEN);