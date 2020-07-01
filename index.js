const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'iamfabricegBot',
		password: 'oauth:qa4iv5qk7ueptk2vxxzqkaiitqxeaq'
	},
	channels: ["#iamfabriceg"]
});

client.connect();

var minutes = Math.floor(process.uptime() / 60);
let seconds = (Math.floor(process.uptime() * 1000) / 1000);

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya :) !`);
	}
  if(message.toLowerCase() === '!subs') {
		client.say(channel, `@${tags.username} voici le lien : https://www.twitch.tv/subs/iamfabriceg`);
	}
	if(message.toLowerCase() === '!ping') {
		client.say(channel, `Pong. Local - running for : ${process.uptime().toFixed(0)} s`);
	}
});
client.commercial("channel", 30)
.then((data) => {
    // data returns [channel, seconds]
}).catch((err) => {
    //
});

client.on('connected', (adress, port) => {
	console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
	client.say("#iamfabriceg", "Hello Twitch ! I'm a real human Kappa");
});