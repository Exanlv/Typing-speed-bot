import { Client, Message } from 'discord.js';
const token = 'NTc3OTQxNDY4NzA3MDI5MDM0.XNsX9A.bE3a3Gf_K6vttm4T06qOeHYE4Ts';

const client = new Client;



client.on('ready', () => {
	console.log('Bot logged in, woooooo!');
})

function sleep(ms: number): Promise<void> {
	return new Promise((resolve: any): any => setTimeout(resolve, ms) );
}

client.on('message', async (message: Message) => {
	if (message.content.toUpperCase() !== '!SPEED')
		return;
		
	let role = message.guild.roles.find(r => r.name.toUpperCase() === 'CHOKED');

	if (!role)
		return;

	message.member.addRole(role);
	
	await sleep(30000);

	message.member.removeRole(role);
});


client.on('error', err => {

});

client.login(token);