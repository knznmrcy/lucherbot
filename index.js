const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config/config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'src', 'commands');
fs.readdirSync(commandsPath).filter(f => f.endsWith('.js')).forEach(file => {
  const cmd = require(path.join(commandsPath, file));
  client.commands.set(cmd.name, cmd);
  if (cmd.aliases) cmd.aliases.forEach(a => client.commands.set(a, cmd));
});

// Load events
const eventsPath = path.join(__dirname, 'src', 'events');
fs.readdirSync(eventsPath).filter(f => f.endsWith('.js')).forEach(file => {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

client.login(config.token);
