const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "daily",
	version: "1.3",
	author: "chris st",
		countDown: 5,
	role: 0,
		description: {
			vi: "Nhận quà hàng ngày",
			en: "Receive daily gift"
	},
		category: "game",
	guide: {
			vi: " {pn}: Nhận quà hàng ngày"
				+ "\n {pn} info: Xem thông tin quà hàng ngày",
			en: " {pn}"
				+ "\n {pn} info: View daily gift information"
	},
		envConfig: {
			rewardFirstDay: {
				coin: 100,
				exp: 10
			}
	}
	},

	langs: {
	vi: {
			monday: "Thứ 2",
			tuesday: "Thứ 3",
			wednesday: "Thứ 4",
			thursday: "Thứ 5",
			friday: "Thứ 6",
			saturday: "Thứ 7",
			sunday: "Chủ nhật",
			alreadyReceived: "Bạn đã nhận quà rồi",
			received: "Bạn đã nhận được %1 coin và %2 exp"
	},
		en: {
			monday: "Monday",
			tuesday: "Tuesday",
			wednesday: "Wednesday",
			thursday: "Thursday",
			friday: "Friday",
			saturday: "Saturday",
			sunday: "Sunday",
			alreadyReceived: "You already claimed today",
			received: "You received %1 coin and %2 exp"
	}
	},

	onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
		const reward = envCommands[commandName].rewardFirstDay;

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

	// Info des récompenses
		if (args[0] == "info") {
			let msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 🎁 𝗗𝗮𝗶𝗹𝘆 𝗥𝗲𝘄𝗮𝗿𝗱 ───\n`;
			for (let i = 1; i < 8; i++) {
				const getCoin = Math.floor(reward.coin * (1 + 0.2) ** (i - 1));
				const getExp = Math.floor(reward.exp * (1 + 0.2) ** (i - 1));
				const day = i == 7? getLang("sunday") :
					i == 6? getLang("saturday") :
						i == 5? getLang("friday") :
							i == 4? getLang("thursday") :
								i == 3? getLang("wednesday") :
									i == 2? getLang("tuesday") :
										getLang("monday");
				msg += `│ 📅 ${day}\n│ 💵 ${formatNum(getCoin)} coin\n│ ✨ ${formatNum(getExp)} exp\n│\n`;
			}
			msg += `╰──────────────────
━━━━━━━ ✕ ━━━━━━`;
			return message.reply(frame(msg));
	}

		const dateTime = moment.tz("Africa/Kinshasa").format("DD/MM/YYYY");
		const date = new Date();
		const currentDay = date.getDay(); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday
		const { senderID } = event;

		const userData = await usersData.get(senderID);
		if (userData.data.lastTimeGetReward === dateTime)
			return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── ⚠️ 𝗗𝗲́𝗷𝗮̀ 𝗥𝗲́𝗰𝘂𝗽𝗲́𝗿𝗲́ ───
│ 😶 ${getLang("alreadyReceived")}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`));

		const getCoin = Math.floor(reward.coin * (1 + 0.2) ** ((currentDay == 0? 7 : currentDay) - 1));
		const getExp = Math.floor(reward.exp * (1 + 0.2) ** ((currentDay == 0? 7 : currentDay) - 1));
		
		userData.data.lastTimeGetReward = dateTime;
		await usersData.set(senderID, {
			money: userData.money + getCoin,
			exp: userData.exp + getExp,
			data: userData.data
	});

		const userName = await usersData.getName(senderID);
		const rank = await getRank(senderID, event.threadID);

		const msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 🎁 𝗥𝗲́𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲 𝗥𝗲𝗰̧𝘂𝗲 ───
│ 👤 Nom: ${userName}
│ 💵 Coins: +${formatNum(getCoin)}$
│ ✨ Exp: +${formatNum(getExp)} XP
│ 🏆 Rank: ${rank}
│ 📅 Date: ${dateTime}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;

		message.reply(frame(msg));
	}
};
