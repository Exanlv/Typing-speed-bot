import { readFileSync, writeFileSync } from 'fs';
import { MessageData } from './message-data';
import { Message } from 'discord.js';
import { OtherMessageData } from './other-message-data';

export class Bot {
	private typingUsers = {['id']: MessageData};

	private userData: {[id: string]: Array<OtherMessageData>};

	constructor() {
		this.userData = JSON.parse(readFileSync(__dirname + '/../data.json').toString());
	}

	public makeSureThisFuckerIsRegisteredPlsAndTy(id) {
		if (!this.typingUsers[id]) {
			this.typingUsers[id] = new MessageData;
		}
	}

	public thisFuckerHasCompletedAMessageSoRegisterIt(id: string) {
		if (!this.userData[id]) {
			this.userData[id] = [];
		} else {
			while (this.userData[id].length > 500) {
				this.userData[id].splice(0, 1);
			}
		}

		this.userData[id].push(this.typingUsers[id].result());
	}

	public startTyping(userId) {
		this.makeSureThisFuckerIsRegisteredPlsAndTy(userId);

		if (this.typingUsers[userId].setTypingstart(new Date)) {
			this.thisFuckerHasCompletedAMessageSoRegisterIt(userId);
		}
	}

	public stopTyping(userId) {
		this.makeSureThisFuckerIsRegisteredPlsAndTy(userId);

		if (this.typingUsers[userId].setTypingEnd(new Date)) {
			this.thisFuckerHasCompletedAMessageSoRegisterIt(userId);
		}
	}

	public messageSend(message: Message) {
		this.makeSureThisFuckerIsRegisteredPlsAndTy(message.author.id);

		if (this.typingUsers[message.author.id].setWords(message.cleanContent.replace(/ /g, '').length / 5)) {
			this.thisFuckerHasCompletedAMessageSoRegisterIt(message.author.id);
		}
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
			words += this.userData[userId][i].w;
			time += this.userData[userId][i].t;
		}

		return `${(words / (time/60000)).toFixed(2)} WPM`;
	}
}