require('dotenv').config();
const reactions = require('./reactions.js');

const express = require('express');
const tmi = require('tmi.js');

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
	channels: [ process.env.TWITCH_USERNAME ]
});

client.connect();

var minutes = Math.floor(process.uptime() / 60);
let seconds = (Math.floor(process.uptime() * 1000) / 1000);


app.listen(8019, err => {
	if(!err) {
		console.log('Listening');
	}
	else {
		console.log(err);
	}
});

app.get('/mods-api/channels/:channel', (req, res) => {
	if(client.readyState() !== 'OPEN') {
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
	if(message.toLowerCase() === '!eo') {
		client.emoteonly("iamfabriceg");
	}
	if(message.toLowerCase() === '!eof') {
		client.emoteonlyoff("iamfabriceg");
	}
	if(message.toLowerCase() === '!discord') {
		client.emoteonlyoff("Lien de mon discord : https://discord.gg/ZBzGsW3");
	}

	let words = message.split(" ");
	for(let word of words) {
    let reaction = reactions[word];
    if(reaction){
        client.say(channel, reaction);
		}
	}
	
	let helloTest = message;
	switch (message) {
		case "bonjour":
			if(isMod(user)){
					client.say(channel, "Bonjour " + user['display-name'] + ", mon rôle de Bot est de t'assister sur cette chaine !");
			} else if(isBroadcaster(user)){
					client.say(channel, "Bonjour " + user['display-name'] + ", je suis content que tu m'ai installé sur ta chaine !");
			} else if(isSubscriber(user)){
					client.say(channel, "Bonjour " + user['display-name'] + ", merci d'avoir souscris à cette chaine !");
			} else {
					client.say(channel, "Bonjour à toi " + user['display-name'] + ", sois le bienvenu !");
			}
		break;
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



client.on('connected', (adress, port) => {
	console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
	client.say("#iamfabriceg", "Hello Twitch ! I'm a real human Kappa");

	console.log(client.mods("iamfabriceg"));
	// client.say("#iamfabriceg", "<moderators>");
});

