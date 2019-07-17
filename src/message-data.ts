import { OtherMessageData } from "./other-message-data";

export class MessageData {
	private typingStart?: number;
	private typingEnd?: number;
	private words?: number;

	private reset() {
		console.log('hi');
		this.typingStart = null;
		this.typingEnd = null;
		this.words = null;
	}

	private complete(): boolean {
		return Boolean(this.typingStart && this.typingEnd && this.words);
	}

	public setTypingstart(typingStart: number): boolean {
		console.log('start');
		if (this.typingStart) {
			this.reset();
		}

		this.typingStart = typingStart;

		return this.complete();
	}

	public setTypingEnd(typingEnd: number): boolean {
		console.log('end');
		if (this.typingEnd) {
			this.reset();
		}

		this.typingEnd = typingEnd;

		return this.complete();
	}

	public setWords(words: number): boolean {
		console.log('words');
		if (this.words) {
			this.reset();
		}

		this.words = words;

		return this.complete();
	}

	public result(): OtherMessageData {
		const results = {'w': this.words, 't': this.typingEnd - this.typingStart};
		console.log(results);
		this.reset();
		return results;
	}
}