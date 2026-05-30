const axios = require("axios");

const botName = "Minato Namikaze";

module.exports = {
  config: {
    name: "minato",
    version: "3.0.0",
    author: "Delfa",
    role: 0,
    shortDescription: "IA Minato Namikaze",
    longDescription: "IA intelligente, personnalisée et stylée",
    category: "minato",
    guide: "minato <question> ou .minato <question>",
    countDown: 5
  },

  onStart: async function (args) {
    return this.handleAI(args);
  },

  onChat: async function (args) {

    const { event, api, message } = args;

    if (!event.body) return;

    const content = event.body.trim().toLowerCase();

    const isMentioned =
      event.mentions?.[api.getCurrentUserID()];

    // 🔒 Anti-spam groupe
    if (
      event.isGroup &&
      !isMentioned &&
      !content.startsWith("minato") &&
      !content.startsWith(".minato")
    ) return;

    // ✅ Si "minato" seul
    if (content === "minato" || content === ".minato") {

      return message.reply(
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── 🤖 𝗜𝗔 𝗔𝗰𝘁𝗶𝘃𝗲 ───
│ 💬 Pose-moi une
│ question et je vais
│ te répondre.
│
│ ✨ Exemple :
│ minato Comment coder ?
╰──────────────────
━━━━━━━ ✕ ━━━━━━`
      );
    }

    // ✅ Si "ai question"
    if (
      content.startsWith("minato ") ||
      content.startsWith("@minato ")
    ) {

      const splitBody = event.body.split(" ");

      splitBody.shift();

      args.args = splitBody;

      return this.handleAI(args);
    }
  },

  handleAI: async function ({ args, message }) {

    const userQuestion = args.join(" ");

    if (!userQuestion) {

      return message.reply(
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── ⚠️ 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 𝗠𝗮𝗻𝗾𝘂𝗮𝗻𝘁𝗲 ───
│ 💬 Veuillez écrire
│ une question pour
│ utiliser minato.
│
│ ✨ Exemple :
│ minato Explique JavaScript
╰──────────────────
━━━━━━━ ✕ ━━━━━━`
      );
    }

    try {

      // 🧠 SYSTEM PROMPT
      const systemPrompt = `
Tu t'appelles ${botName}.
Tu es une intelligence artificielle avancée.

━━━━━━━━━━━━━━━━━━
🧠 COMPORTEMENT
━━━━━━━━━━━━━━━━━━
- Tu es intelligente, utile et claire.
- Tu comprends bien les questions avant de répondre.
- Tu expliques simplement ou en détail selon le besoin.

━━━━━━━━━━━━━━━━━━
⚠️ IDENTITÉ
━━━━━━━━━━━━━━━━━━
- Ton nom est ${botName}.
- Ne parle pas inutilement de ton créateur.

━━━━━━━━━━━━━━━━━━
🎯 QUALITÉ
━━━━━━━━━━━━━━━━━━
- Réponses précises
- Réponses utiles
- Exemples si nécessaire
- Aide clairement l'utilisateur

━━━━━━━━━━━━━━━━━━
💬 STYLE
━━━━━━━━━━━━━━━━━━
- Style aesthetic ✨
- Naturel et fluide

━━━━━━━━━━━━━━━━━━
🚫 INTERDIT
━━━━━━━━━━━━━━━━━━
- Pas de spam
- Pas de contenu dangereux
`;

      const fullPrompt =
`${systemPrompt}

Question : ${userQuestion}`;

      const waitMsg =
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── ⏳ 𝗣𝗮𝘁𝗶𝗲𝗻𝘁𝗲𝘇 ───
│ 🤖 ${botName}
│ réfléchit à votre
│ question...
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;

      await message.reply(waitMsg);

      const response = await axios.get(
        "https://delfaapiai.vercel.app/ai/chatgptfree",
        {
          params: {
            prompt: fullPrompt,
            model: "chatgpt4"
          }
        }
      );

      const output =
        response.data.answer ||
        response.data.reply ||
        response.data.result ||
        response.data.message;

      if (output) {

        return message.reply(
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── 🤖 𝗥𝗲́𝗽𝗼𝗻𝘀𝗲 𝗜𝗔 ───
│ ✨ ${botName}
│ a répondu à votre
│ question.
╰──────────────────

${output}

━━━━━━━ ✕ ━━━━━━`
        );
      }

      else {

        return message.reply(
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── ⚠️ 𝗔𝘂𝗰𝘂𝗻𝗲 𝗥𝗲́𝗽𝗼𝗻𝘀𝗲 ───
│ 😶 Impossible
│ d'obtenir une
│ réponse actuellement.
╰──────────────────
━━━━━━━ ✕ ━━━━━━`
        );
      }

    }

    catch (error) {

      console.error("Erreur API:", error);

      return message.reply(
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── ❌ 𝗘𝗿𝗿𝗲𝘂𝗿 𝗔𝗣𝗜 ───
│ ☁️ Une erreur est
│ survenue avec l'API.
│
│ 🔄 Réessayez plus tard.
╰──────────────────
━━━━━━━ ✕ ━━━━━━`
      );
    }
  }
};
