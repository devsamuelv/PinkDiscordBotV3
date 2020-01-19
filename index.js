let discord = require('discord.js');
var fs = require('fs');
require('dotenv').config();
// require('http').createServer().listen(3000); // only for api's the require a port num

let bot = new discord.Client();
var prefix = '!';

bot.on('message', message => {
    var args = message.content.substring(prefix.length).split(' ');

    try { // put all messages in the try function
        switch(args[0]) {
            case 'hi':
                var author = message.member.nickname;
                message.sendMessage(`Hi ${author}`);
            break;

            case 'help':
                var author = message.author.username;
                message.sendMessage(`${author} here is only one command hi more are comming soon`);
                break;
        }

        if (message.author.username == "diamond dunkers YT") {
            if (message.channel.name != 'memes') {
                if (message.type !== 'dm') {
                    message.delete();
                } else {
                    console.log('couldent delete image');
                }
            }
        } else {
            console.log(`${message.author.username} user is not blacklisted`);
            fs.writeFile('userlog.txt', `${message.author.username} is not blacklisted` (error) => {
                if (error) {
                    throw err;
                }
            })
        }
    } catch(err) {
        fs.writeFile('log.txt', err, (error) => {
            if (error) {
                throw err;
            }
        })
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => {
        ch.name === 'welcome'
    });

    if (!channel) {return;}

    channel.sendMessage(`Welcome to the server, ${member}`);
})

bot.on('ready', () => {
    console.log('ready');
    bot.user.setPresence({
        game: {
            name: "🎧the chat🎧",
            type: 3
        }
    })
});

bot.login(process.env.TOKEN)