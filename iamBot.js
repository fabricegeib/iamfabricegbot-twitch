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
	channels: ["#iamfabriceg", "#littlebigwhale"]
});
client.connect();
client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!mimi') {
		client.say(channel, `lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi lbwMimi`);
	}
});