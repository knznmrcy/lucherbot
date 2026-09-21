const { EmbedBuilder } = require('discord.js');
const config = require('../../config/config');

module.exports = {
  name: 'help',
  aliases: ['h', 'commands'],
  description: 'Tampilkan semua command',
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor(config.color.primary)
      .setTitle('🔒 LUCHER ONTOP — Command List')
      .setDescription(`Prefix: \`${config.prefix}\``)
      .addFields(
        {
          name: '🎭 Get Role',
          value: `\`${config.prefix}getrole\` — Kirim embed tombol Get Role ke channel ini\n*Alias: \`${config.prefix}gr\`, \`${config.prefix}role\`*`,
        },
        {
          name: '📢 Announcement',
          value: `\`${config.prefix}announce #channel | Judul | Isi\` — Kirim pengumuman\n*Alias: \`${config.prefix}ann\`, \`${config.prefix}pengumuman\`*`,
        },
        {
          name: '❓ Help',
          value: `\`${config.prefix}help\` — Tampilkan pesan ini`,
        }
      )
      .setFooter({ text: 'LUCHER ONTOP Bot' })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};
