const config = require('../../config/config');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(`Error command ${commandName}:`, err);
      message.reply({ content: '❌ Terjadi error saat menjalankan command.' });
    }
  }
};

