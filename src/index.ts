import { Client } from 'discord.js';
import { Config } from './config';
import { Bot } from './bot';

const client = new Client();

let bot = new Bot();

client.on('typingStart', (channel, user) => {
	if (user.bot)
		return;

	bot.startTyping(user.id);
});

client.on('message', message => {
	if (message.author.bot)
		return;

	if (message.content.toUpperCase().startsWith('!SPEED')) {
		if (message.mentions.members && message.mentions.members.size) {
			message.reply(`Their typing speed is ${bot.getWPM(message.mentions.members.first().id)}`);
			return;
		}
		message.reply(`your typing speed is ${bot.getWPM(message.author.id)}`);
		return;
	}

	bot.messageSend(message);
});

client.on('ready', () => {
	console.log('Bot logged in');
})

client.login(Config.token);

setInterval(() => {
	bot.saveData();
}, 300000);

client.on('error', console.error);