import discord

class MyClient(discord.Client):
	async def on_ready(self):
		print('Logged in as', self.user)
	
	async def on_message(self, message):
		if message.author == self.user:
			return

		if message.content == 'ping':
			await message.channel.send('pong')

client = MyClient()
client.run('NTc3OTQxNDY4NzA3MDI5MDM0.XNsX9A.bE3a3Gf_K6vttm4T06qOeHYE4Ts')