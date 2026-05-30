module.exports = {
	config: {
		name: "balance",
	aliases: ["bal"],
	version: "1.4",
	author: "chris st",
		countDown: 5,
	role: 0,
		description: {
			vi: "xem số tiền hiện có của bạn hoặc người được tag",
			en: "view your money or the money of the tagged person"
	},
		category: "economy",
	guide: {
			vi: " {pn}: xem số tiền của bạn"
				+ "\n {pn} <@tag>: xem số tiền của người được tag",
			en: " {pn}: view your money"
				+ "\n {pn} <@tag>: view the money of the tagged person"
	}
	},

	langs: {
	vi: {
			money: "Bạn đang có %1$",
			moneyOf: "%1 đang có %2$"
	},
	en: {
			money: "You have %1$",
			moneyOf: "%1 has %2$"
	}
	},

	onStart: async function ({ message, usersData, event, getLang, threadsData }) {
		
		function frame(text) {
			return `
❖ ── ✦ ──『✙』── ✦ ── ❖

${text}
❖ ── ✦ ──『✙』── ✦ ── ❖

`;
	}

		function formatMoney(num) {
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

	// Si y'a des mentions
		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 💰 𝗕𝗮𝗹𝗮𝗻𝗰𝗲 𝗨𝘀𝗲𝗿𝘀 ───\n`;

			for (const uid of uids) {
				const userMoney = await usersData.get(uid, "money");
				const name = event.mentions[uid].replace("@", "");
				const rank = await getRank(uid, event.threadID);
				msg += `│ 👤 ${name}\n│ 💵 ${formatMoney(userMoney)}$\n│ 🏆 Rank: ${rank}\n│\n`;
			}
			
			msg += `╰──────────────────
━━━━━━━ ✕ ━━━━━━`;

			return message.reply(frame(msg));
	}

	// Balance de l'utilisateur
		const uid = event.senderID;
		const userData = await usersData.get(uid);
		const userMoney = userData.money || 0;
		const userName = await usersData.getName(uid);
		const rank = await getRank(uid, event.threadID);

		const msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 💰 𝗩𝗼𝘁𝗿𝗲 𝗕𝗮𝗹𝗮𝗻𝗰𝗲 ───
│ 👤 Nom: ${userName}
│ 💵 Montant: ${formatMoney(userMoney)}$
│ 🏆 Rank: ${rank}
│ 💳 Statut: Actif
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;

		return message.reply(frame(msg));
	}
};
