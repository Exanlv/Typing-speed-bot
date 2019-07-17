import { Client, Message } from 'discord.js';
import { Config } from './config';
import { Bot } from './bot';

const client = new Client();

let bot = new Bot();

client.on('raw', (raw: any) => {
	console.log(raw.t);
});

client.on('message', (message: Message) => {
	if (message.content.toUpperCase() === '!SPEED') {
		message.reply('yell at discord to fix their API, typing speed bot is dead');
	}
});

// client.on('typingStop', (channel, user) => {
// 	if (user.bot)
// 		return;

// 	bot.stopTyping(user.id);
// })

// client.on('message', message => {
// 	if (message.author.bot)
// 		return;

// 	if (message.content.toUpperCase().startsWith('!SPEED')) {
// 		if (message.mentions.members && message.mentions.members.size) {
// 			message.reply(`Their typing speed is ${bot.getWPM(message.mentions.members.first().id)}`);
// 			return;
// 		}
// 		message.reply(`your typing speed is ${bot.getWPM(message.author.id)}`);
// 		return;
// 	}

// 	bot.messageSend(message);
// });

// client.on('ready', () => {
// 	console.log('Bot logged in');
// })

client.login(Config.token);

// setInterval(() => {
// 	bot.saveData();
// }, 300000);

// client.on('error', console.error);