import discord
import datetime
import atexit
from time import sleep
import json
from decimal import Decimal

class MyClient(discord.Client):
	typingUsers = {}
	data = {}
	timeSinceLastWrite = 0

	def loadData(self):
		f = open('data.json', 'r')
		self.data = json.loads(f.read())
		self.timeSinceLastWrite = datetime.datetime.now().timestamp()

	def save(self):
		f = open('data.json', 'w')
		f.write(json.dumps(self.data))
		self.timeSinceLastWrite = datetime.datetime.now().timestamp()
	
	async def on_ready(self):
		print('Logged in as', self.user)
	
	async def on_message(self, message):
		if str(message.author.id) in self.typingUsers:
			if str(message.author.id) not in self.data:
				self.data[str(message.author.id)] = []

			time = round(message.created_at.timestamp() - self.typingUsers[str(message.author.id)])
			words = len(message.content.replace(' ', '')) / 5

			if words / time > 120:
				return

			while len(self.data[str(message.author.id)]) > 500:
				self.data[str(message.author.id)].pop(0)
			
			self.data[str(message.author.id)].append({'w': words, 't': time})
			self.typingUsers.pop(str(message.author.id), None)
		
		if message.content == '!speed':
			await message.channel.send(message.author.name + ', your typing speed is ' + str(self.get_avg(message.author.id)) + ' wpm')
		
		if datetime.datetime.now().timestamp() - self.timeSinceLastWrite > 5:
			self.save()

	async def on_typing(self, channel, user, when):
		self.typingUsers[str(user.id)] = when.timestamp()

	def get_avg(self, user_id):
		words = 0
		time = 0

		for message in self.data[str(user_id)]:
			words += message['w']
			time += message['t']
			
		return round(words / (time / 60000), 2)


client = MyClient()
client.loadData()
client.run('')