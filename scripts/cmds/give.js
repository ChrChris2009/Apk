module.exports.config = {
  name: "give",
  version: "1.2.1",
  hasPermission: 0,
  credits: "Les Ombres",
  description: "Donne argent par mention ou reply",
  commandCategory: "Game",
  usages: "[@tag] [montant] ou reply au msg + give [montant]",
  cooldowns: 2
};

module.exports.onStart = async function({ api, event, args, usersData, message }) {

  function frame(text) {
    return `
❖ ── ✦ ──『✙』── ✦ ── ❖

${text}
❖ ── ✦ ──『✙』── ✦ ── ❖

`;
  }

  function formatNum(num) {
    return num.toLocaleString("en-US");
  }

  async function getRank(uid, threadID) {
    try {
      const allUsers = await usersData.getAll(["money", threadID]);
      const sorted = allUsers
    .filter(u => u[threadID] && typeof u[threadID].money === "number")
    .sort((a, b) => b[threadID].money - a[threadID].money);
      const rank = sorted.findIndex(u => u.userID === uid) + 1;
      return rank > 0? `#${rank}` : "#N/A";
    } catch {
      return "#N/A";
    }
  }

  let uid;
  let amount;

  // 1. Reply mode
  if (event.type === "message_reply" && event.messageReply) {
    uid = event.messageReply.senderID;
    amount = parseInt(args[0]);
  }
  // 2. Mention mode
  else {
    uid = Object.keys(event.mentions)[0];
    amount = parseInt(args[1]);
  }

  if (!uid ||!amount || amount <= 0 || isNaN(amount)) {
    return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── ❌ 𝗘𝗿𝗲𝘂𝗿 𝗨𝘀𝗮𝗴𝗲 ───
│ 💬 Usage:
│ 1. Reply + give 1000
│ 2. give @user 1000
╰──────────────────
━━━━━━━ ✕ ━━━━━━`));
  }

  if (uid === event.senderID) {
    return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
╭── ⚠️ 𝗜𝗺𝗽𝗼𝘀𝗶𝗯𝗹𝗲 ───
│ 😅 Tu peux pas te give toi-même
╰──────────────────`));
  }

  const senderData = await usersData.get(event.senderID);
  if ((senderData.money || 0) < amount) {
    return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 💸 𝗙𝗼𝗻𝗱𝘀 𝗜𝗻𝘀𝘂𝗳𝗶𝘀𝗮𝗻𝘁𝘀 ───
│ 💵 Ton solde: ${formatNum(senderData.money || 0)}$
│ 💳 Montant: ${formatNum(amount)}$
╰──────────────────
━━━━━━━ ✕ ━━━━━━`));
  }

  const receiverName = await usersData.getName(uid);
  const senderName = await usersData.getName(event.senderID);

  await usersData.set(event.senderID, {
    money: (senderData.money || 0) - amount
  });

  const receiverData = await usersData.get(uid);
  await usersData.set(uid, {
    money: (receiverData.money || 0) + amount
  });

  const newSenderMoney = (senderData.money || 0) - amount;
  const receiverRank = await getRank(uid, event.threadID);
  const senderRank = await getRank(event.senderID, event.threadID);

  const msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── ✅ 𝗧𝗿𝗮𝗻𝘀𝗳𝗲𝗿𝘁 𝗥𝗲́𝘂𝘀𝗶 ───
│ 💸 Montant: ${formatNum(amount)}$
│
│ 👤 De: ${senderName}
│ 💵 Reste: ${formatNum(newSenderMoney)}$
│ 🏆 Rank: ${senderRank}
│
│ 👤 À: ${receiverName}
│ 🏆 Rank: ${receiverRank}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;

  return message.reply(frame(msg));
};
