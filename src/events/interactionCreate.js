const { EmbedBuilder } = require('discord.js');
const config = require('../../config/config');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    // Handle tombol Get Role
    if (interaction.isButton() && interaction.customId === 'get_role') {
      await handleGetRole(interaction);
      return;
    }
  }
};

async function handleGetRole(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const member = interaction.member;
  const roleId = process.env.MEMBER_ROLE_ID || '1551546203123220540';

  if (!roleId) {
    return interaction.editReply({ content: '❌ MEMBER_ROLE_ID belum diset di .env!' });
  }

  const role = interaction.guild.roles.cache.get(roleId);
  if (!role) {
    return interaction.editReply({ content: '❌ Role tidak ditemukan. Cek MEMBER_ROLE_ID di .env.' });
  }

  // Cek kalau sudah punya role
  if (member.roles.cache.has(roleId)) {
    return interaction.editReply({ content: `✅ Kamu sudah punya role **${role.name}**!` });
  }

  try {
    await member.roles.add(role);
    const embed = new EmbedBuilder()
      .setColor(config.color.success)
      .setTitle('✅ Berhasil!')
      .setDescription(`Kamu mendapatkan role **${role.name}**!\nSelamat datang di server 🎉`)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    console.error('Error memberi role:', err);
    await interaction.editReply({ content: '❌ Gagal memberi role. Pastikan bot punya permission **Manage Roles** dan rolenya di bawah role bot.' });
  }
}

