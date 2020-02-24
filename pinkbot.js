let discord = require('discord.js');
var fs = require('fs');
require('dotenv').config();
var firebase = require('firebase');
// require('http').createServer().listen(3000); // only for api's the require a port num

let bot = new discord.Client();
var prefix = '!';
// const configPrefix = "§";
// const configPrefix2 = "<";
const version = "0.1.0";
var configType = 3;

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

doc.onSnapshot(function (doc) {
    bot.user.setPresence({
        game: {
            name: doc.data().statName,
            type: doc.data().statNumber,
        }
    })
})

const badnames = ['pipebomb', 'pipe bomb', 'bomb', 'weed', 'pp small'];

bot.on('message', message => {
    const Msgcontent = message.content.toLocaleLowerCase();
    if (Msgcontent.includes(badnames)) {
        message.channel.delete();
    }
})

bot.on('message', message => {
    var args = message.content.substring(prefix.length).split(' ');

    try { // put all messages in the try function to catch errors
        switch (args[0]) {
            case 'hi':
                var author = message.member.nickname;
                message.sendMessage(`Hi ${author}`);
                break;

            case 'help':
                var author = message.author.username;
                message.sendMessage(`${author} here is only one command hi more are comming soon`);
                break;

            case 'info':
                message.send(`( ${new Date} )\n`);
                message.send(`Current Version ${version} \n`);
                break;
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
        var fileData = fs.readFileSync('log.txt', 'utf8');

        fs.writeFile('log.txt', `\n${fileData} \n ${new Date} \n ${err}`);
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => {
        ch.name === 'welcome'
    });

    if (!channel) { return; }

    channel.sendMessage(`Welcome to the server, ${member}`);
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
