const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config/config');

module.exports = {
  name: 'getrole',
  aliases: ['gr', 'role'],
  description: 'Kirim embed verifikasi Get Role ke channel ini',
  async execute(message, args, client) {
    // Cek permission admin
    const adminRoleId = process.env.ADMIN_ROLE_ID || '1551545679883796520';
    if (adminRoleId && !message.member.roles.cache.has(adminRoleId) && !message.member.permissions.has('Administrator')) {
      return message.reply({ content: '❌ Kamu tidak punya izin untuk command ini.' });
    }

    // Hapus command message
    await message.delete().catch(() => {});

    const embed = new EmbedBuilder()
      .setColor(config.color.primary)
      .setTitle('🔒 Verifikasi')
      .setDescription(
        '**Selesaikan verifikasi singkat di bawah untuk\nmendapatkan akses member.**\n\n' +
        '**Note**\n' +
        'Tekan **Get Role** untuk mendapatkan\nakses member secara langsung.'
      )
      .setFooter({ text: `LUCHER ONTOP • ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` })
      .setThumbnail('https://i.imgur.com/6LnIwlI.png'); // Gembok icon

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('get_role')
        .setLabel('Get Role')
        .setEmoji('🔒')
        .setStyle(ButtonStyle.Success)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
};

