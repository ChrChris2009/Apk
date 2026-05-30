const axios = require("axios");
const { getTime } = global.utils;

module.exports.config = {
  name: "quiz",
  version: "1.7.0",
  hasPermission: 0,
  credits: "Les Ombres + Minato",
  description: "Ultimate Quiz System avec 32 catégories",
  commandCategory: "Game",
  usages: "[category/rank/leaderboard]",
  cooldowns: 3
};

const QUIZ_DATA = {
  anime: [
    { q: "Qui est le personnage principal de Naruto?", a: ["Naruto Uzumaki", "Naruto"], hint: "Ninja blond" },
    { q: "Comment s'appelle le Titan d'Eren?", a: ["Titan Assaillant", "Attack Titan"], hint: "Il attaque" },
    { q: "Qui est L dans Death Note?", a: ["L Lawliet", "L"], hint: "Détective" },
    { q: "Nom du bateau de Luffy?", a: ["Thousand Sunny", "Sunny"], hint: "Ensoleillé" },
    { q: "Plus fort Hashira Demon Slayer?", a: ["Gyomei", "Gyomei Himejima"], hint: "Pierre" }
  ],
  movie: [
    { q: "Qui a dit 'I'll be back'?", a: ["Terminator", "Arnold Schwarzenegger"], hint: "Robot" },
    { q: "Film avec 'May the Force be with you'?", a: ["Star Wars"], hint: "Espace" },
    { q: "Titanic a coulé en quelle année dans le film?", a: ["1912"], hint: "19xx" },
    { q: "Acteur principal de Iron Man?", a: ["Robert Downey Jr", "RDJ"], hint: "R.D" },
    { q: "Qui a réalisé Inception?", a: ["Christopher Nolan", "Nolan"], hint: "C.N" }
  ],
  marvel: [
    { q: "Vrai nom de Iron Man?", a: ["Tony Stark"], hint: "T.S" },
    { q: "Marteau de Thor s'appelle?", a: ["Mjolnir", "Mjölnir"], hint: "M..." },
    { q: "Qui est le roi du Wakanda?", a: ["Black Panther", "T'Challa"], hint: "Panthère" },
    { q: "Pierres d'Infinité: combien?", a: ["6", "Six"], hint: "Entre 5-7" }
  ],
  dc: [
    { q: "Vrai nom de Batman?", a: ["Bruce Wayne"], hint: "B.W" },
    { q: "Ennemi juré de Batman?", a: ["Joker"], hint: "J..." },
    { q: "Ville de Superman?", a: ["Metropolis"], hint: "M..." },
    { q: "Lasso de Wonder Woman?", a: ["Lasso de Vérité", "Truth Lasso"], hint: "Vérité" }
  ],
  bangla: [
    { q: "What is 'Hello' in Bangla?", a: ["Namaskar"], hint: "N..." },
    { q: "Capital of Bangladesh?", a: ["Dhaka"], hint: "D..." }
  ],
  biology: [
    { q: "Combien de chromosomes humain?", a: ["46"], hint: "40-50" },
    { q: "Organe qui produit insuline?", a: ["Pancréas"], hint: "P..." }
  ],
  chemistry: [
    { q: "Symbole de l'Or?", a: ["Au"], hint: "2 lettres" },
    { q: "H2O est?", a: ["Eau"], hint: "Tu bois" }
  ],
  english: [
    { q: "Past tense of 'go'?", a: ["Went"], hint: "W..." },
    { q: "Opposite of 'hot'?", a: ["Cold"], hint: "C..." }
  ],
  filipino: [
    { q: "Thank you in Filipino?", a: ["Salamat"], hint: "S..." },
    { q: "Capital Philippines?", a: ["Manila"], hint: "M..." }
  ],
  flag: [
    { q: "🇫🇷 Quel pays?", a: ["France"], hint: "Europe" },
    { q: "🇯🇵 Quel pays?", a: ["Japon"], hint: "Asie" },
    { q: "🇧🇷 Quel pays?", a: ["Brésil"], hint: "Amérique Sud" },
    { q: "🇨🇲 Quel pays?", a: ["Cameroun"], hint: "Afrique Centrale" }
  ],
  general: [
    { q: "Combien de continents?", a: ["7"], hint: "5-10" },
    { q: "Plus grand océan?", a: ["Pacifique"], hint: "P..." },
    { q: "Année actuelle?", a: ["2026"], hint: "Regarde date" }
  ],
  hindi: [
    { q: "Namaste means?", a: ["Hello"], hint: "Salutation" },
    { q: "Capital India?", a: ["New Delhi"], hint: "D..." }
  ],
  history: [
    { q: "Qui a découvert Amérique?", a: ["Christophe Colomb"], hint: "C.C" },
    { q: "Révolution française année?", a: ["1789"], hint: "17xx" },
    { q: "Premier homme sur Lune?", a: ["Neil Armstrong"], hint: "Arm..." }
  ],
  math: [
    { q: "5 + 7 × 2 =?", a: ["19"], hint: "Priorité ×" },
    { q: "Racine carrée 144?", a: ["12"], hint: "12×12" },
    { q: "10% de 200?", a: ["20"], hint: "200/10" }
  ],
  physics: [
    { q: "Vitesse lumière km/s?", a: ["300000"], hint: "300k" },
    { q: "E=mc² c'est qui?", a: ["Einstein"], hint: "E..." }
  ],
  science: [
    { q: "Planète plus proche Soleil?", a: ["Mercure"], hint: "M..." },
    { q: "Combien de planètes?", a: ["8"], hint: "Entre 5-10" }
  ],
  space: [
    { q: "Plus grande planète?", a: ["Jupiter"], hint: "J..." },
    { q: "Nom galaxie?", a: ["Voie Lactée"], hint: "Lait" }
  ],
  torf: [
    { q: "Le Soleil tourne autour Terre", a: ["Faux", "F"], hint: "V/F" },
    { q: "Eau bout à 100°C", a: ["Vrai", "V"], hint: "V/F" }
  ],
  football: [
    { q: "Joueurs par équipe?", a: ["11"], hint: "10+1" },
    { q: "Plus de Ballon d'Or?", a: ["Messi"], hint: "Argentin" }
  ],
  programming: [
    { q: "Langage web front-end?", a: ["JavaScript", "JS"], hint: "JS" },
    { q: "HTML signifie?", a: ["HyperText Markup Language"], hint: "Hyper" }
  ],
  food: [
    { q: "Plat national Sénégal?", a: ["Thieboudienne", "Ceebu jën"], hint: "Riz poisson" },
    { q: "Pays sushi?", a: ["Japon"], hint: "J..." }
  ],
  geography: [
    { q: "Plus long fleuve?", a: ["Nil"], hint: "Afrique" },
    { q: "Plus haut sommet?", a: ["Everest"], hint: "E..." }
  ],
  technology: [
    { q: "Fondateur Microsoft?", a: ["Bill Gates"], hint: "B.G" },
    { q: "RAM signifie?", a: ["Random Access Memory"], hint: "Mémoire" }
  ],
  music: [
    { q: "Notes dans gamme?", a: ["7"], hint: "Do à Si" },
    { q: "Instrument 6 cordes?", a: ["Guitare"], hint: "G..." }
  ],
  religion: [
    { q: "Livre sacré musulmans?", a: ["Coran"], hint: "C..." },
    { q: "Pèlerinage La Mecque?", a: ["Hajj"], hint: "H..." }
  ],
  cartoon: [
    { q: "Qui vit dans un ananas sous la mer?", a: ["Bob l'éponge", "SpongeBob"], hint: "Jaune" },
    { q: "Chien qui parle avec Scooby?", a: ["Scooby-Doo"], hint: "Scooby" }
  ],
  games: [
    { q: "Jeu avec Mario?", a: ["Super Mario", "Mario"], hint: "Plombier" },
    { q: "Console PlayStation: marque?", a: ["Sony"], hint: "S..." }
  ],
  logic: [
    { q: "Si tous les Zogs sont bleus, et Bob est Zog, Bob est?", a: ["Bleu"], hint: "Logique" },
    { q: "Quel nombre suit: 2, 4, 8, 16?", a: ["32"], hint: "×2" }
  ]
};

const CATEGORIES = Object.keys(QUIZ_DATA);

function frame(text) {
  return `❖ ── ✦ ──『🎯』── ✦ ── ❖\n\n${text}\n❖ ── ✦ ──『🎯』── ✦ ── ❖`;
}

function catLine() {
  const cats = CATEGORIES.map(c => {
    const icons = { movie: "🎬", marvel: "🦸", dc: "🦇", anime: "🎯", flag: "🏳️", math: "➕", physics: "⚡", science: "🔬", space: "🚀", football: "⚽", programming: "💻", food: "🍔", geography: "🌎", technology: "💾", music: "🎵", religion: "☪️", cartoon: "🎨", games: "🎮", logic: "🧠" };
    return `${icons[c] || "📍"} ${c}`;
  });
  return cats.join(" ");
}

module.exports.onStart = async function({ api, event, args, usersData, currencies, message }) {
  const { senderID } = event;
  const cmd = args[0]?.toLowerCase();
  const user = await usersData.get(senderID);
  const userName = await usersData.getName(senderID);
  const userRole = user.role || 0;
  const userRank = userRole == 2? "Admin Bot" : userRole == 1? "Admin Groupe" : "Membre";

  if (!user.data.quiz) user.data.quiz = { score: 0, total: 0, streak: 0, categories: {} };
  const q = user.data.quiz;

  if (!cmd) {
    return message.reply(frame(`🚀 ❲ Minato ❳
╭── 📚 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀 𝗤𝘂𝗶𝘇 ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│
│ ${catLine()}
│
│ 🏆 Usages
│ • quiz rank - Ton rank
│ • quiz leaderboard - Top 10
│ • quiz <categorie> - Jouer
│
│ 💰 Récompense: 100-500$ + bonus streak
╰──────────────────`));
  }

  if (cmd == "rank") {
    const accuracy = q.total > 0? Math.floor((q.score / q.total) * 100) : 0;
    return message.reply(frame(`🚀 ❲ Minato ❳
╭── 🏆 𝗧𝗢𝗡 𝗥𝗔𝗡𝗞 ──
│ 👤 ${userName} | 🎖️ ${userRank}
│ ⭐ Score: ${q.score}/${q.total}
│ 🎯 Précision: ${accuracy}%
│ 🔥 Streak: ${q.streak}
╰──────────────────`));
  }

  if (cmd == "leaderboard") {
    const allUsers = await usersData.getAll();
    const top = allUsers.filter(u => u.data.quiz?.score > 0).map(u => ({ name: u.name, score: u.data.quiz.score, accuracy: Math.floor((u.data.quiz.score / u.data.quiz.total) * 100) })).sort((a, b) => b.score - a.score).slice(0, 10);
    let msg = `🚀 ❲ Minato ❳\n╭── 🏆 𝗟𝗘𝗔𝗗𝗘𝗥𝗕𝗢𝗔𝗥𝗗 ──\n`;
    top.forEach((u, i) => {
      const medal = i == 0? "🥇" : i == 1? "🥈" : i == 2? "🥉" : `${i + 1}.`;
      msg += `│ ${medal} ${u.name}\n│ ⭐ ${u.score} | 🎯 ${u.accuracy}%\n│\n`;
    });
    return message.reply(frame(msg + `╰──────────────────`));
  }

  if (!CATEGORIES.includes(cmd)) {
    return message.reply(frame(`🚀 ❲ Minato ❳\n╭── ❌ Erreur ──\n│ Catégorie invalide\n│ Tape: quiz\n╰──────────────────`));
  }

  const questions = QUIZ_DATA[cmd];
  const question = questions[Math.floor(Math.random() * questions.length)];
  const reward = Math.floor(Math.random() * 400) + 100;

  if (!q.categories[cmd]) q.categories[cmd] = { correct: 0, total: 0 };

  const sentMsg = await message.reply(frame(`🚀 ❲ Minato ❳
╭── 🎯 𝗤𝗨𝗜𝗭 ${cmd.toUpperCase()} ──
│ 👤 ${userName} | 🎖️ ${userRank}
│ ❓ ${question.q}
│ 💡 ${question.hint}
│ 💰 $${reward} | ⏰ 30s
│ Réponds à ce message!
╰──────────────────`));

  if (!global.client.handleReply) global.client.handleReply = [];
  global.client.handleReply.push({
    name: this.config.name,
    messageID: sentMsg.messageID,
    author: senderID,
    category: cmd,
    answer: question.a.map(a => a.toLowerCase()),
    reward,
    time: getTime()
  });

  setTimeout(async () => {
    const idx = global.client.handleReply.findIndex(e => e?.messageID == sentMsg.messageID);
    if (idx!== -1) {
      global.client.handleReply.splice(idx, 1);
      q.streak = 0;
      await usersData.set(senderID, user);
      message.reply(frame(`🚀 ❲ Minato ❳\n╭── ⏰ Temps écoulé ──\n│ ✅ ${question.a[0]}\n│ 🔥 Streak reset\n╰──────────────────`));
    }
  }, 30000);
};

module.exports.handleReply = async function({ api, event, args, usersData, currencies, message, handleReply }) {
  const { senderID, body } = event;
  const user = await usersData.get(senderID);
  const q = user.data.quiz;
  const { category, answer, reward } = handleReply;
  const userName = await usersData.getName(senderID);
  const userRole = user.role || 0;
  const userRank = userRole == 2? "Admin Bot" : userRole == 1? "Admin Groupe" : "Membre";

  const userAnswer = body.toLowerCase().trim();
  const isCorrect = answer.some(a => userAnswer == a || userAnswer.includes(a));

  q.total++;
  q.categories[category].total++;

  if (isCorrect) {
    q.score++;
    q.categories[category].correct++;
    q.streak++;
    const bonus = q.streak >= 5? Math.floor(reward * 0.5) : 0;
    const total = reward + bonus;
    await currencies.increaseMoney(senderID, total);
    await usersData.set(senderID, user);
    message.reply(frame(`🚀 ❲ Minato ❳
╭── ✅ CORRECT ──
│ 👤 ${userName} | 🎖️ ${userRank}
│ 💰 +$${total.toLocaleString()}${bonus > 0? ` [Streak x${q.streak}]` : ""}
│ 🔥 Streak: ${q.streak}
│ ⭐ ${q.score}/${q.total}
╰──────────────────`));
  } else {
    q.streak = 0;
    await usersData.set(senderID, user);
    message.reply(frame(`🚀 ❲ Minato ❳
╭── ❌ FAUX ──
│ 👤 ${userName} | 🎖️ ${userRank}
│ ✅ Réponse: ${answer[0]}
│ 🔥 Streak reset
│ ⭐ ${q.score}/${q.total}
╰──────────────────`));
  }

  const idx = global.client.handleReply.findIndex(e => e?.messageID == handleReply.messageID);
  if (idx!== -1) global.client.handleReply.splice(idx, 1);
};
