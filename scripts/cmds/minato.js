const axios = require("axios");
const fs = require("fs");
const path = require("path");
const googleTTS = require("google-tts-api");

// 📦 MEMORY
const DB_FILE = path.join(__dirname, "minato_memory.json");

// 🧠 MEMORY 4 DAYS
const MEMORY_DAYS = 4;
const MEMORY_TIME = MEMORY_DAYS * 24 * 60 * 60 * 1000;

// 💾 LOAD DB
function loadDB() {
  try {
    if (!fs.existsSync(DB_FILE)) return {};
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// 💾 SAVE DB
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// 🧠 MEMORY
function getMem(id) {
  const db = loadDB();

  if (!db[id]) {
    db[id] = {
      name: null,
      mood: "⚪ normal",
      messages: 0,
      uid: id,
      history: [],
      lastSeen: Date.now()
    };
  }

  if (!Array.isArray(db[id].history)) db[id].history = [];

  return db[id];
}

function setMem(id, data) {
  const db = loadDB();
  db[id] = data;
  saveDB(db);
}

// 🕒 TIME
function getTime() {
  return new Date().toLocaleString("fr-FR", {
    timeZone: "Africa/Kinshasa"
  });
}

// 🎨 IMAGE
function imagine(prompt) {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
}

// 🧹 CLEAN TEXT (AMÉLIORÉ)
function cleanText(text) {
  return (text || "")
    .replace(/🎀|✨|🌸/g, "")
    .replace(/SHIZU|Aryan|chaucha/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// 🚀 MINATO FRAME STYLE
function frame(text) {
  return `
🚀 ❲ 𝗠𝗜𝗡𝗔𝗧𝗢 𝗔𝗜 ❳ 🚀
━━━━━━━━━━━━━━━━━━
${text}
━━━━━━━━━━━━━━━━━━
⚡ Powered by Minato System
`;
}

// 🤖 AI CORE
async function askAI(prompt, mem, uid) {
  const fullPrompt = `
Tu es MINATO AI 🤖

Règles:
- Réponds naturellement
- Pas de titre inutile
- Pas de répétition
- Réponds dans la langue de l'utilisateur
- Réponses claires et utiles
- Utilise emoji si nécessaire
- Ne parle jamais de créateurs inconnus
- Style calme et intelligent

Utilisateur: ${mem.name || "inconnu"}
Heure: ${getTime()}
Humeur: ${mem.mood}

Message:
${prompt}
`;

  try {
    const res = await axios.post(
      "https://shizuai.vercel.app/chat",
      {
        uid,
        message: fullPrompt
      },
      { timeout: 15000 }
    );

    return res.data?.reply || res.data?.message || "Minato actif ⚡";
  } catch {
    return "Minato actif ⚡";
  }
}

module.exports = {
  config: {
    name: "minato",
    version: "11.0.0",
    role: 0,
    category: "ai"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    if (!event.body) return;

    const body = event.body.trim();

    // activation
    if (!body.toLowerCase().startsWith("minato")) return;

    const input = body.slice(6).trim();
    if (!input) return;

    const uid = event.senderID;
    let mem = getMem(uid);

    mem.messages++;
    mem.lastSeen = Date.now();

    // mood system
    if (/triste|sad/i.test(input)) mem.mood = "😢 sad";
    else if (/merci|thanks/i.test(input)) mem.mood = "😊 happy";
    else if (/blague|joke/i.test(input)) mem.mood = "😂 funny";
    else mem.mood = "⚪ normal";

    const now = Date.now();

    mem.history.push({ text: input, time: now });
    mem.history = mem.history.filter(h => now - h.time <= MEMORY_TIME);
    if (mem.history.length > 50) mem.history.shift();

    setMem(uid, mem);

    try {

      // 🎨 IMAGE
      if (input.toLowerCase().startsWith("imagine ")) {
        const prompt = input.slice(8);

        return message.reply({
          body: frame(`🎨 ${prompt}`),
          attachment: await axios.get(imagine(prompt), {
            responseType: "stream"
          }).then(r => r.data)
        });
      }

      // 🔊 TTS
      if (/^(parle|dis|say)\s+/i.test(input)) {
        const textToSpeak = input.replace(/^(parle|dis|say)\s+/i, "").trim();

        const url = googleTTS.getAudioUrl(textToSpeak, {
          lang: "fr",
          slow: false
        });

        const res = await axios.get(url, { responseType: "arraybuffer" });
        const file = path.join(__dirname, "minato.mp3");

        fs.writeFileSync(file, Buffer.from(res.data));

        return message.reply({
          body: frame(textToSpeak),
          attachment: fs.createReadStream(file)
        }, () => fs.unlinkSync(file));
      }

      // 🤖 AI
      const reply = await askAI(input, mem, uid);
      const clean = cleanText(reply);

      return message.reply(frame(clean));

    } catch {
      return message.reply(frame("Minato actif ⚡"));
    }
  }
};
