import * as discord from 'discord.js';
import * as varibles from './varibles';
// ? import * as functions from './functions';

const SongEmbed = new discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

export const ErrEmbed = new discord.RichEmbed()
    .setTitle("Incorrect Permissions")
    .setAuthor("Pinky", varibles.Botlogo)
    .setDescription("Im Sorry you dont have Moderator Permissions")
    .setColor(11111111)
    .setTimestamp()
 

export const gameNightEmbed = new discord.RichEmbed()
    .setTitle("Game Night Info")
    .setDescription("⌚Game Night is on Fridays At 7pm⌚")
    .setColor(11111111)
    .setAuthor("Pinky", varibles.Botlogo)
