const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ LUCHER ONTOP online sebagai ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: 'LUCHER ONTOP 🔒', type: ActivityType.Watching }],
      status: 'online',
    });
  }
};
