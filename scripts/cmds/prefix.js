const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "prefix",
	version: "1.6.1",
	author: "NTKhang",
		countDown: 5,
	role: 0,
		description: "Changer le prefix du bot",
		category: "config",
	guide: {
			en: " {pn} <prefix>: Changer prefix groupe"
				+ "\n {pn} <prefix> -g: Changer prefix global"
				+ "\n {pn} reset: Reset prefix groupe"
	}
	},

	langs: {
	en: {
			reset: "Prefix reset à: %1",
			onlyAdmin: "Admin bot seulement pour le prefix global",
			confirmGlobal: "Réagis pour confirmer le prefix global",
			confirmThisThread: "Réagis pour confirmer le prefix du groupe",
			successGlobal: "Prefix global: %1",
			successThisThread: "Prefix groupe: %1",
			myPrefix: "🌐 Système: %1\n🛸 Groupe: %2"
	}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang, usersData }) {
		const userName = await usersData.getName(event.senderID);
		const userRank = role == 2? "Admin Bot" : role == 1? "Admin Groupe" : "Membre";

		if (!args[0]) return message.SyntaxError();

		if (args[0] == 'reset') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(`
❖ ── ✦ ──『⚙️』── ✦ ── ❖

🚀 ❲ Minato ❳
╭── ✅ Reset ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│ ${getLang("reset", global.GoatBot.config.prefix)}
╰──────────────────
❖ ── ✦ ──『⚙️』── ✦ ── ❖
`);
	}

		const newPrefix = args[0];
		const formSet = { commandName, author: event.senderID, newPrefix };

		if (args[1] === "-g") {
			if (role < 2) return message.reply(`
❖ ── ✦ ──『⚙️』── ✦ ── ❖

🚀 ❲ Minato ❳
╭── ⚠️ Refusé ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│ ${getLang("onlyAdmin")}
╰──────────────────
❖ ── ✦ ──『⚙️』── ✦ ── ❖
`);
			formSet.setGlobal = true;
	} else {
			formSet.setGlobal = false;
	}

		return message.reply(`
❖ ── ✦ ──『⚙️』── ✦ ── ❖

🚀 ❲ Minato ❳
╭── ⚠️ Confirmation ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│ ${args[1] === "-g"? getLang("confirmGlobal") : getLang("confirmThisThread")}
│ 🆕 Nouveau: ${newPrefix}
╰──────────────────
❖ ── ✦ ──『⚙️』── ✦ ── ❖
`, (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
	});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang, usersData }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID!== author) return;

		const userName = await usersData.getName(author);
		const userData = await usersData.get(author);
		const userRole = userData.role || 0;
		const userRank = userRole == 2? "Admin Bot" : userRole == 1? "Admin Groupe" : "Membre";

		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(`
❖ ── ✦ ──『⚙️』── ✦ ── ❖

🚀 ❲ Minato ❳
╭── ✅ Global ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│ ${getLang("successGlobal", newPrefix)}
╰──────────────────
❖ ── ✦ ──『⚙️』── ✦ ── ❖
`);
	}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(`
❖ ── ✦ ──『⚙️』── ✦ ── ❖

🚀 ❲ Minato ❳
╭── ✅ Groupe ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│ ${getLang("successThisThread", newPrefix)}
╰──────────────────
❖ ── ✦ ──『⚙️』── ✦ ── ❖
`);
	}
	},

	onChat: async function ({ event, message, getLang, usersData }) {
		if (event.body && event.body.toLowerCase().trim() === "prefix") {
			const userName = await usersData.getName(event.senderID);
			const userData = await usersData.get(event.senderID);
			const userRole = userData.role || 0;
			const userRank = userRole == 2? "Admin Bot" : userRole == 1? "Admin Groupe" : "Membre";
			
			try {
				const sysPrefix = global.GoatBot.config.prefix;
				const threadPrefix = await utils.getPrefix(event.threadID) || sysPrefix;
				return message.reply(`
❖ ── ✦ ──『⚙️』── ✦ ── ❖

🚀 ❲ Minato ❳
╭── 📌 Prefix ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│ ${getLang("myPrefix", sysPrefix, threadPrefix)}
╰──────────────────
❖ ── ✦ ──『⚙️』── ✦ ── ❖
`);
			} catch (e) {
				return message.reply(`
❖ ── ✦ ──『⚙️』── ✦ ── ❖

🚀 ❲ Minato ❳
╭── 📌 Prefix ──
│ 👤 ${userName}
│ 🎖️ Rank: ${userRank}
│ 🌐 Système: ${global.GoatBot.config.prefix}
╰──────────────────
❖ ── ✦ ──『⚙️』── ✦ ── ❖
`);
			}
	}
	}
};
