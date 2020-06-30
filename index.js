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
});
client.commercial("channel", 30)
.then((data) => {
    // data returns [channel, seconds]
}).catch((err) => {
    //
});