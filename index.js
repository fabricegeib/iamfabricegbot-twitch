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

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya :) !`);
  	}
  	if(message.toLowerCase() === '!subs') {
		client.say(channel, `@${tags.username} voici le lien : https://www.twitch.tv/subs/iamfabriceg`);
	}
	if(message.toLowerCase() === 'wesh') {
		client.say(channel, `Wesh alors, wesh alors Wesh alors, wesh alors Wesh alors`);
	}
	if(message.toLowerCase() === 'twitter') {
		client.say(channel, `https://twitter.com/iamfabriceg`);
	}
});

setInterval(() => {
	client.say("hello world - http://iamfabriceg.xyz");
}, 10 * 60 * 10)

client.on("subscription", function (channel, username, methods ) {
	client.say(channel, username + " Has subscribed PogChamp " )
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

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}