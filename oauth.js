require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		secure: true,
		reconnect: true
	},
	identity: {
		username: process.env.TWITCH_BOT,
		password: process.env.TWITCH_AUTH_CODE
	},
	channels: [ process.env.TWITCH_USERNAME ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
});

client.on('connected', (adress, port) => {
	console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
	client.say("#iamfabriceg", "Hello Twitch ! I'm a real human Kappa");
});
		