pm2 start index.js --watch --name twitch-iamBot
pm2 stop index.js --watch --name twitch-iamBot

pm2 start index.js --watch --name discord-iamBot
pm2 stop index.js --watch --name discord-iamBot

##
Règles à respecter dans le chat pour préserver une bonne ambiance :
- pas de spam
- pas d'abus de majuscules et d'émotes
- pas de demandes de jeu
- soyez polis et courtois

## Bots
patreon
streamcord
muxy
utip

##

channel #iamfabriceg
tags { emotes: {}, 'emotes-raw': null, 'message-type': 'chat' }
message Hello Twitch ! I'm a real human Kappa
self true

tags {
  'badge-info': null,
  badges: { moderator: '1', partner: '1' },
  color: '#32C3A2',
  'display-name': 'Streamlabs',
  emotes: { '25': [ '3-7' ] },
  flags: null,
  id: 'f53d73c5-e853-4b40-ad7a-62925d1ba29e',
  mod: true,
  'room-id': '108366345',
  subscriber: false,
  'tmi-sent-ts': '1610244832786',
  turbo: false,
  'user-id': '105166207',
  'user-type': 'mod',
  'emotes-raw': '25:3-7',
  'badge-info-raw': null,
  'badges-raw': 'moderator/1,partner/1',
  username: 'streamlabs',
  'message-type': 'chat'
}

## Streamcord help
We recommend using the dashboard to easily manage notifications and live role.

#### General
!twitch help - Shows bot help

!twitch info - Shows bot info

!twitch lang - Sets bot language

!twitch invite - Displays a link to add Streamcord to your server

!twitch status - Shows Twitch API status

!twitch ping - Pong!

### Twitch

!twitch user <user> - Gets info on a Twitch channel

!twitch stream user <user> - Gets info on a user's stream

!twitch stream watch <user> - Watch a Twitch stream from Discord

!twitch stream game <name> - Watch someone stream the specified game

!twitch stream top - Fetches info on a top stream

!twitch game <name> - Gets info on a Twitch game

!twitch top - Gets the most popular Twitch games

### Clips
!twitch clips from <user> - Gets a clip from the specified Twitch user

!twitch clips trending - Gets a trending clip

!twitch clips game <game> - Gets a clip from the specified game

### Streamer Notifications
!twitch notif add [#discord_channel] [streamer_name] [message] - Adds a streamer notification for a streamer to the specified channel
!twitch notif remove <#discord_channel> <streamer_name> - Remove a streamer notification for a streamer to the specified channel
!twitch notif list [#discord_channel] - Lists the streamer notifications for the specified channel
!twitch notif formatting - Shows variables that you can insert into streamer notification messages
!twitch notif preview <#discord_channel> <streamer_name> - Sends a preview message for a notification

### Live Role
!twitch lr set role - Sets the Live Role for the current server
!twitch lr set filter - Restricts Live Role to users with a specific role
!twitch lr delete - Removes the Live Role configuration
!twitch lr view - Tells you which role is currently set up
!twitch lr check - Debug the live role
Audio
!twitch listen <user> - Listen to a Twitch stream in the current voice channel
!twitch nowplaying - Shows the stream currently playing, if any
!twitch leave - Leaves a voice channel