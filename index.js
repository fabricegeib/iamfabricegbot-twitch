require('dotenv').config();
const reactions = require('./reactions.js');

const express = require('express');
const tmi = require('tmi.js');
const { username } = require('tmi.js/lib/utils');

const app = express();

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
	channels: [process.env.TWITCH_USERNAME]
});

client.connect();

var minutes = Math.floor(process.uptime() / 60);
let seconds = (Math.floor(process.uptime() * 1000) / 1000);


app.listen(8019, err => {
	if (!err) {
		console.log('Listening');
	}
	else {
		console.log(err);
	}
});

app.get('/mods-api/channels/:channel', (req, res) => {
	if (client.readyState() !== 'OPEN') {
		return res.json({
			error: 'Service Unavailable',
			status: 503,
			message: 'Not ready'
		});
	}
	let channel = req.params.channel.toLowerCase();
	client.mods(channel)
		.then(moderators => {
			res.json({
				channel,
				moderators
			});
		})
		.catch(err => {
			res.json({
				error: 'Internal Server Error',
				status: 500,
				message: 'Some error occurred'
			})
		});
});

client.on('message', (channel, tags, message, self, isMod, user) => {
	if (self) return;

	if (message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya :) !`);
	}
	if (message.toLowerCase() === '!subs') {
		client.say(channel, `@${tags.username} voici le lien : https://www.twitch.tv/subs/iamfabriceg`);
	}
	if (message.toLowerCase() === '!ping') {
		client.say(channel, `Pong. Local - running for : ${process.uptime().toFixed(0)} s`);
	}
	if (message.toLowerCase() === '!epic') {
		client.say(channel, `Mon pseudo EPIC Games : iamfabriceg`);
	}
	if (message.toLowerCase() === '!lol') {
		client.say(channel, `	https://euw.op.gg/summoner/userName=fabriceg`);
	}
	if (message.toLowerCase() === '!instagram') {
		client.say(channel, `Mon compte Instagram : https://www.instagram.com/iamfabriceg/`);
	}
	if (message.toLowerCase() === '!stw-elements') {
		client.say(channel, `Tableau des éléments de Fortnite : Sauver le Monde - https://iamfabriceg.xyz/fortnite/save-the-world/images/elements.png`);
	}
	if (message.toLowerCase() === '!youtube') {
		client.say(channel, `Ma chaine YouTube : https://www.youtube.com/channel/UCKv4GgFKQvPG2rt3MOZK8Xg/`);
	}
	if (message.toLowerCase() === '!zzz') {
		client.action(channel, `est fatigué`);
	}
	if (message.toLowerCase() === '!eo') {
		client.emoteonly("iamfabriceg");
	}
	if (message.toLowerCase() === '!eof') {
		client.emoteonlyoff("iamfabriceg");
	}
	if (message.toLowerCase() === '!discord') {
		client.say(channel, `Rejoins le discord : https://discord.gg/2CPt337u9p`);
	}
	if (message.toLowerCase() === '!commands') {
		client.say(channel, `La liste des commandes du bot est disponible sur cette page : !hello !discord !epic !subs !stw-elements !zzz`);
	}

	// -> Merci de ne pas publier de lien sans autorisation.

	// let words = message.split(" ");
	// for (let word of words) {
	// 	let reaction = reactions[word];
	// 	if (reaction) {
	// 		client.say(channel, reaction);
	// 	}
	// }

	// let helloTest = message;
	// switch (message) {
	// 	case "bonjour":
	// 		if (isMod(user)) {
	// 			client.say(channel, "Bonjour " + user['display-name'] + ", mon rôle de Bot est de t'assister sur cette chaine !");
	// 		} else if (isBroadcaster(user)) {
	// 			client.say(channel, "Bonjour " + user['display-name'] + ", je suis content que tu m'ai installé sur ta chaine !");
	// 		} else if (isSubscriber(user)) {
	// 			client.say(channel, "Bonjour " + user['display-name'] + ", merci d'avoir souscris à cette chaine !");
	// 		} else {
	// 			client.say(channel, "Bonjour à toi " + user['display-name'] + ", sois le bienvenu !");
	// 		}
	// 		break;
	// }

});

client.on('message', (channel, tags, message, self, username, months, userstate, methods, isMod, user) => {
	// if (self) return;

	// if (message.toLowerCase() === '!discord') {
	// 	client.say(channel, `Rejoins le discord : https://discord.gg/2CPt337u9p`);
	// }

	// client.say(channel, username + " Has subscribed for " + months + " months in a row PogChamp ")

	setInterval(() => {
		// message.channel.send(`hy`).then(() => count++);
		client.say(channel, `30s`);
	}, 30000);
});

client.on("resub", function (channel, username, months, message, userstate, methods) {
	client.say(channel, username + " Has subscribed for " + months + " months in a row PogChamp ")
});

client.on("subscription", (channel, username, method, message, userstate) => {
	client.say(channel, `Merci pour ton abonnement ${method} ${username}`);
});

client.on("resub", function (channel, username, _months, message, userstate, methods) {
	let streakMonths = userstate["msg-param-streak-months"];
	client.say(channel, `Merci pour ton réabonnement depuis ${streakMonths} mois consecutifs ${username}`);
});

client.on('message', (channel, userstate, message, self) => {
	if (self || message[0] !== '!') return;
	let parameters = message.split(' ').filter(n => n);
	let command = parameters.shift().slice(1).toLowerCase();
	if (command === 'love') {
		let msg = `${userstate['display-name']} envoie de l'amour à ${parameters[0]} <3 <3 <3`;
		client.say(channel, msg);
	}
});

client.on('message', (channel, userstate, message, self) => {
	if (self || message[0] !== '!') return;
	let parameters = message.split(' ').filter(n => n);
	let command = parameters.shift().slice(1).toLowerCase();
	if (command === 'tg') {
		let msg = `Ferme ta gueule on t'a dit ${parameters[0]} !`;
		client.say(channel, msg);
	}
});

client.commercial("channel", 30)
	.then((data) => {
		// data returns [channel, seconds]
	}).catch((err) => {
		//
	});

// client.api({
// 	url: "https://api.twitch.tv/kraken/user",
// 	method: "GET",
// 	headers: {
// 			"Accept": "application/vnd.twitchtv.v5+json",
// 			"Authorization": "OAuth 3eb787117110834e079932bedfb8e6a7",
// 			"Client-ID": "1dac77895e8f56fa1a71e7c43ef09d87"
// 	}
// }, (err, res, body) => {
// 	console.log(body);
// });

client.on('message', (channel, tags, message, self) => {
	console.log('channel', channel);
	console.log('tags', tags);
	console.log('message', message);
	console.log('self', self);
});

client.on('message', (channel, tags, message, self) => {

});


client.on('connected', (adress, port, channel) => {
	console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
	client.say("#iamfabriceg", "Hello Twitch ! I'm a real human Kappa");
	// client.say(channel, "Hello Twitch ! I'm a real human Kappa");


	console.log(client.mods("iamfabriceg"));
	// client.say("#iamfabriceg", "<moderators>");
});

