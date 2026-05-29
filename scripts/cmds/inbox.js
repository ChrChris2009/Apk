module.exports = {
  config: {
    name: "inbox",
    aliases: ["in"],
    version: "1.1",
    author: "chris st",
    countDown: 10,
    role: 0,
    shortDescription: {
      fr: "Envoyer un message en MP au bot"
    },
    longDescription: {
      fr: "Permet d'activer le bot en MP et de recevoir un message de confirmation"
    },
    category: "box chat",
    guide: {
      fr: " {pn} : Active le bot en MP et envoie une confirmation"
    }
  },

  langs: {
    fr: {
      successGroup: "✅ Message envoyé avec succès",
      successMP: "✅ Accès autorisé",
      checkInbox: "🔰 Vérifie tes messages ou la boîte de réception des demandes",
      ready: "🔰 Tu peux maintenant utiliser le bot ici",
      error: "❌ Une erreur est survenue"
    }
  },

  onStart: async function({ api, event, args, message, getLang }) {
    const frame = (title, content) => {
      return `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 💬 ${title} ───
│ ${content}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;
    };

    try {
      // Message dans le groupe
      message.reply(
        frame("Inbox", `${getLang("successGroup")}\n│ ${getLang("checkInbox")}`),
        event.threadID
      );

      // Message en MP
      api.sendMessage(
        frame("Bienvenue", `${getLang("successMP")}\n│ ${getLang("ready")}`),
        event.senderID
      );

    } catch (error) {
      console.error("Erreur inbox: " + error);
      message.reply(
        frame("Erreur", `│ ${getLang("error")}\n│ ${error.message}`)
      );
    }
  }
}
