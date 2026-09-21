const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const config = require('../../config/config');

module.exports = {
  name: 'announce',
  aliases: ['ann', 'pengumuman'],
  description: 'Kirim pengumuman ke channel tertentu',
  // Usage: !announce #channel | Judul | Isi pesan
  async execute(message, args, client) {
    // Cek permission
    const adminRoleId = process.env.ADMIN_ROLE_ID || '1551545679883796520';
    if (adminRoleId && !message.member.roles.cache.has(adminRoleId) && !message.member.permissions.has('Administrator')) {
      return message.reply({ content: '❌ Kamu tidak punya izin untuk command ini.' });
    }

    // Format: !announce #channel | Judul | Isi pesan
    const fullText = message.content.slice(config.prefix.length + 'announce'.length).trim();
    const parts = fullText.split('|').map(p => p.trim());

    if (parts.length < 3) {
      const helpEmbed = new EmbedBuilder()
        .setColor(config.color.warning)
        .setTitle('📢 Cara pakai !announce')
        .setDescription(
          '**Format:**\n```!announce #channel | Judul | Isi pesan```\n\n' +
          '**Contoh:**\n```!announce #📢pengumuman | Update Server | Server maintenance sebentar lagi!```\n\n' +
          '**Alias:** `!ann`, `!pengumuman`'
        );
      return message.reply({ embeds: [helpEmbed] });
    }

    // Parse channel
    const channelMention = parts[0];
    const title = parts[1];
    const body = parts.slice(2).join('|').trim(); // sisa setelah judul

    const targetChannel = message.mentions.channels.first() ||
      message.guild.channels.cache.find(c => c.name === channelMention.replace('#', ''));

    if (!targetChannel || targetChannel.type !== ChannelType.GuildText) {
      return message.reply({ content: '❌ Channel tidak ditemukan. Mention channel dengan `#channel`.' });
    }

    // Build embed pengumuman
    const announceEmbed = new EmbedBuilder()
      .setColor(config.color.primary)
      .setTitle(`📢 ${title}`)
      .setDescription(body)
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setFooter({ text: `LUCHER ONTOP • ${message.guild.name}` })
      .setTimestamp();

    try {
      await targetChannel.send({ embeds: [announceEmbed] });
      await message.delete().catch(() => {});

      // Konfirmasi ke pengirim (ephemeral-style: hapus otomatis)
      const confirm = await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(config.color.success)
            .setDescription(`✅ Pengumuman berhasil dikirim ke ${targetChannel}!`)
        ]
      });
      setTimeout(() => confirm.delete().catch(() => {}), 5000);
    } catch (err) {
      console.error('Error kirim announce:', err);
      message.reply({ content: '❌ Gagal kirim pengumuman. Cek permission bot di channel tujuan.' });
    }
  }
};

