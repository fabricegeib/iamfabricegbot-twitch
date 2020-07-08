require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: process.env.TWITCH_BOT,
		password: process.env.TWITCH_AUTH_CODE
	},
	channels: [ process.env.TWITCH_USERNAME ]
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
	if(message.toLowerCase() === '!epic') {
		client.say(channel, `Mon pseudo EPIC Games : iamfabriceg`);
	}
	if(message.toLowerCase() === '!stw-elements') {
		client.say(channel, `Tableau des éléments de Fortnite : Sauver le Monde - https://iamfabriceg.xyz/fortnite/save-the-world/images/elements.png`);
	}
	if(message.toLowerCase() === '!zzz') {
		client.action(channel, `est fatigué`);
	}

	
});

client.on("resub", function (channel, username, months, message, userstate, methods) {
	client.say(channel, username + " Has subscribed for " + months + " months in a row PogChamp " )
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
