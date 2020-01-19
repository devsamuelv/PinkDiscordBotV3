let discord = require('discord.js');
require('dotenv').config();
// require('http').createServer().listen(3000); // only for api's the require a port num

let bot = new discord.Client();
var prefix = '~';

bot.on('message', message => {
    var args = message.content.split(' ').join(prefix.length);

    try { // put all messages in the try function
        switch(args[0]) {
            case 'hi':
                var author = message.member.nickname;
                message.sendMessage(`Hi ${author}`);
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
            console.log(`${message.author} user is not blacklisted`);
        }
    } catch(err) {
        console.log(err);
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