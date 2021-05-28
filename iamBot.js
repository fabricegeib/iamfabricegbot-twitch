const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'iamfabriceg',
		password: 'oauth:42a99yr7zmqlabu4procd0wja0bqu0'
	},
	channels: ["#nanojunior"]
});

// client.connect();

client.on('message', (channel, tags, message, self) => {
	if (self) return;
	if (message.toLowerCase() === '!love') {
		client.say(channel, `<3 <3 <3`);
	}
});

client.on('connected', (adress, port, channel) => {
	console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
	client.say("#nanojunior", "Hello Twitch ! I'm a real human Kappa");
	// client.say(channel, "Hello Twitch ! I'm a real human Kappa");

});
