const fs = require("fs-extra");

module.exports = {
  config: {
    name: "loadconfig",
    aliases: ["loadcf"],
    version: "1.4.1",
    author: "NTKhang + Minato",
    countDown: 5,
    role: 2,
    description: {
      vi: "Load lại config của bot",
      en: "Reload config of bot"
    },
    category: "owner",
    guide: "{pn}"
  },

  langs: {
    vi: {
      success: "Config đã được load lại thành công"
    },
    en: {
      success: "Config has been reloaded successfully"
    }
  },

  onStart: async function ({ message, getLang }) {
    function getDate() {
      var d = new Date();
      var day = d.getDate() < 10? "0" + d.getDate() : d.getDate();
      var month = d.getMonth() + 1 < 10? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      return day + "/" + month + "/" + d.getFullYear();
    }

    try {
      global.GoatBot.config = fs.readJsonSync(global.client.dirConfig);
      global.GoatBot.configCommands = fs.readJsonSync(global.client.dirConfigCommands);

      var msg = "❖ ── ✦ ──『✙』── ✦ ── ❖\n\n";
      msg += "🚀 ❲ Minato Namikaze ❳ 🚀\n";
      msg += "━━━━━━━━━━━━━━━\n";
      msg += "╭── ✅ 𝗖𝗼𝗻𝗳𝗶𝗴 𝗥𝗲𝗹𝗼𝗮𝗱𝗲𝗱 ───\n";
      msg += "│ 📅 Date: " + getDate() + "\n";
      msg += "│ 📂 File: config.json\n";
      msg += "│ 📂 File: configCommands.json\n";
      msg += "│ 💬 Status: " + getLang("success") + "\n";
      msg += "╰──────────────────\n";
      msg += "━━━━━━━ ✕ ━━━━━━\n";
      msg += "❖ ── ✦ ──『✙』── ✦ ── ❖";

      message.reply(msg);
    } catch (e) {
      var errMsg = "❖ ── ✦ ──『✙』── ✦ ── ❖\n\n";
      errMsg += "🚀 ❲ Minato Namikaze ❳ 🚀\n";
      errMsg += "━━━━━━━━━━━━━━━\n";
      errMsg += "╭── ❌ 𝗘𝗿𝗲𝘂𝗿 𝗖𝗼𝗻𝗳𝗶𝗴 ───\n";
      errMsg += "│ 📅 Date: " + getDate() + "\n";
      errMsg += "│ ⚠️ Erreur: " + e.message + "\n";
      errMsg += "╰──────────────────\n";
      errMsg += "━━━━━━━ ✕ ━━━━━━\n";
      errMsg += "❖ ── ✦ ──『✙』── ✦ ── ❖";
      message.reply(errMsg);
    }
  }
};
