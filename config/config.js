require('dotenv').config();

module.exports = {
  token: process.env.BOT_TOKEN,
  prefix: process.env.PREFIX || '!',
  memberRoleId: process.env.MEMBER_ROLE_ID,
  adminRoleId: process.env.ADMIN_ROLE_ID,
  color: {
    primary: 0x5865F2,
    success: 0x57F287,
    error: 0xED4245,
    warning: 0xFEE75C,
  }
};

