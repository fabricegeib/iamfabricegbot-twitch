const tmi = require('tmi.js');
const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'iamfabricegBot',
        password: 'oauth:qa4iv5qk7ueptk2vxxzqkaiitqxeaq'
    },
    channels: ['nanojunior']
});

client.connect().catch(console.error);

client.on('message', (channel, userstate, message, self) => {
    if (self || message[0] !== '!') return;
    let parameters = message.split(' ').filter(n => n);
    let command = parameters.shift().slice(1).toLowerCase();
    if (command === 'love') {
        let msg = `${userstate['display-name']} envoie de l'amour à ${parameters[0]} <3 <3 <3`;
        client.say(channel, msg);
    }
});

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, heya!`);
    }
});

client.on('connected', (adress, port, channel) => {
    console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
    client.say("#nanojunior", "Hello Twitch ! I'm a real human Kappa");
    // client.say(channel, "Hello Twitch ! I'm a real human Kappa");

});
