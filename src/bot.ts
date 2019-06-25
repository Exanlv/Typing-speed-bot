import { readFileSync, writeFileSync } from 'fs';
import { Config } from './config';
import { MessageData } from './message-data';
import { Message } from 'discord.js';

export class Bot {
	private typingUsers = {};

	private userData: {[id: string]: Array<MessageData>};

	constructor() {
		this.userData = JSON.parse(readFileSync(__dirname + '/../data.json').toString());
	}

	public startTyping(userId) {
		this.typingUsers[userId] = new Date().getTime();
	}

	public messageSend(message: Message) {
		if (!this.typingUsers[message.author.id]) {
			return;
		}

		const words = message.cleanContent.replace(/ /g, '').length / 5;
		const time = message.createdTimestamp - this.typingUsers[message.author.id];

		if (time < 0 || words / (time / 60000) > 120) {
			return;
		}

		delete this.typingUsers[message.author.id];

		if (!this.userData[message.author.id]) {
			this.userData[message.author.id] = [];
		} else {
			while(this.userData[message.author.id].length > 500) {
				this.userData[message.author.id].splice(0, 1);
			}
		}

		this.userData[message.author.id].push({'typingTime': time, 'words': words});
	}

	public saveData() {
		writeFileSync(__dirname + '/../data.json', JSON.stringify(this.userData));
	}

	public getWPM(userId) {
		if (!this.userData[userId]) {
			return 'not set';
		}

		var words = 0;
		var time = 0;

		for (let i in this.userData[userId]) {
			words += this.userData[userId][i].words;
			time += this.userData[userId][i].typingTime;
		}

		return `${(words / (time/60000)).toFixed(2)} WPM`;
	}
}