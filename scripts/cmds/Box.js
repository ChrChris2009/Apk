const axios = require("axios");
const request = require("request");
const fs = require("fs");

module.exports = {
	config: {
		name: "box",
		aliases: ["group", "gc"],
		version: "2.0",
		author: "Minato Namikaze",
		countDown: 5,
		role: 0,
		shortDescription: {
			fr: "Gestion complète du groupe"
		},
		longDescription: {
			fr: "Modifier le nom, emoji, photo, pseudo et informations du groupe"
		},
		category: "admin",
		guide: {
			fr: "{pn}"
		}
	},

	onStart: async function ({ api, event, message, args, usersData }) {

		const threadInfo = await api.getThreadInfo(event.threadID);
		const senderInfo = await usersData.get(event.senderID);

		const userName = senderInfo.name || "Utilisateur";
		const nickname =
			threadInfo.nicknames[event.senderID] || "Aucun surnom";

		const adminList = [];

		for (const admin of threadInfo.adminIDs) {
			const info = await api.getUserInfo(admin.id);
			adminList.push(info[admin.id].name);
		}

		const approval =
			threadInfo.approvalMode == true
				? "🟢 ACTIVÉ"
				: "🔴 DÉSACTIVÉ";

		const botInGroup = threadInfo.participantIDs.includes(api.getCurrentUserID())
			? "✅ OUI"
			: "❌ NON";

		const msg = `
╭───────────────✦
│ 📦 𝗚𝗘𝗦𝗧𝗜𝗢𝗡 𝗗𝗨 𝗚𝗥𝗢𝗨𝗣𝗘
├────────────────
│ 🏷️ Nom : ${threadInfo.threadName}
│ 😀 Emoji : ${threadInfo.emoji || "❌"}
│ 👥 Membres : ${threadInfo.participantIDs.length}
│ 👑 Admins : ${threadInfo.adminIDs.length}
│ 🤖 Bot dans le groupe : ${botInGroup}
│ 🔐 Approbation : ${approval}
│ 🖼️ Photo : ${threadInfo.imageSrc ? "✅ OUI" : "❌ NON"}
│
│ 👤 Ton nom :
│ ${userName}
│
│ 🏷️ Ton surnom :
│ ${nickname}
├────────────────
│ 👑 ADMINISTRATEURS
${adminList.map(name => `│ • ${name}`).join("\n")}
├────────────────
│ 1️⃣ Changer le nom du groupe
│ 2️⃣ Changer la photo du groupe
│ 3️⃣ Changer l’emoji du groupe
│ 4️⃣ Changer ton surnom
│ 5️⃣ Activer/Désactiver l’approbation
│ 6️⃣ Voir l’UID du groupe
│ 7️⃣ Voir tous les membres
│ 8️⃣ Informations du groupe
╰───────────────✦

👉 Réponds avec un chiffre.
`;

		return message.reply(msg, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName: this.config.name,
				author: event.senderID,
				type: "menu"
			});
		});
	},

	onReply: async function ({ api, event, Reply, usersData, message }) {

		if (event.senderID != Reply.author)
			return message.reply("❌ | Tu ne peux pas utiliser ce menu.");

		const choice = event.body;

		if (Reply.type == "menu") {

			if (choice == "1") {
				const msg = `
╭───────────────✦
│ 🏷️ CHANGER LE NOM
╰───────────────✦

📝 Réponds avec le nouveau nom du groupe.
`;

				return message.reply(msg, (err, info) => {
					global.GoatBot.onReply.set(info.messageID, {
						commandName: this.config.name,
						author: event.senderID,
						type: "changeName"
					});
				});
			}

			if (choice == "2") {
				const msg = `
╭───────────────✦
│ 🖼️ CHANGER LA PHOTO
╰───────────────✦

📌 Réponds à une image pour la mettre en photo du groupe.
`;

				return message.reply(msg);
			}

			if (choice == "3") {
				const msg = `
╭───────────────✦
│ 😀 CHANGER L’EMOJI
╰───────────────✦

✨ Réponds avec le nouvel emoji du groupe.
`;

				return message.reply(msg, (err, info) => {
					global.GoatBot.onReply.set(info.messageID, {
						commandName: this.config.name,
						author: event.senderID,
						type: "changeEmoji"
					});
				});
			}

			if (choice == "4") {
				const msg = `
╭───────────────✦
│ 🏷️ CHANGER LE SURNOM
╰───────────────✦

✏️ Réponds avec ton nouveau surnom.
`;

				return message.reply(msg, (err, info) => {
					global.GoatBot.onReply.set(info.messageID, {
						commandName: this.config.name,
						author: event.senderID,
						type: "changeNickname"
					});
				});
			}

			if (choice == "5") {

				const threadInfo = await api.getThreadInfo(event.threadID);

				api.setApprovalMode(
					event.threadID,
					!threadInfo.approvalMode
				);

				return message.reply(
					threadInfo.approvalMode
						? "🔴 | Le mode approbation a été désactivé."
						: "🟢 | Le mode approbation a été activé."
				);
			}

			if (choice == "6") {

				return message.reply(`
╭───────────────✦
│ 🆔 UID DU GROUPE
╰───────────────✦

📌 ${event.threadID}
`);
			}

			if (choice == "7") {

				const threadInfo = await api.getThreadInfo(event.threadID);

				let allMembers = "";

				for (const user of threadInfo.userInfo) {
					allMembers += `• ${user.name}\n`;
				}

				return message.reply(`
╭───────────────✦
│ 👥 LISTE DES MEMBRES
╰───────────────✦

${allMembers}
`);
			}

			if (choice == "8") {

				const threadInfo = await api.getThreadInfo(event.threadID);

				const msg = `
╭───────────────✦
│ 📦 INFORMATIONS DU GROUPE
├────────────────
│ 🏷️ Nom : ${threadInfo.threadName}
│ 🆔 UID : ${threadInfo.threadID}
│ 👥 Membres : ${threadInfo.participantIDs.length}
│ 👑 Admins : ${threadInfo.adminIDs.length}
│ 😀 Emoji : ${threadInfo.emoji}
│ 💬 Messages : ${threadInfo.messageCount}
│ 🔐 Approbation :
│ ${threadInfo.approvalMode ? "🟢 ACTIVÉ" : "🔴 DÉSACTIVÉ"}
╰───────────────✦
`;

				return message.reply(msg);
			}
		}

		if (Reply.type == "changeName") {

			api.setTitle(event.body, event.threadID);

			return message.reply(`
╭───────────────✦
│ ✅ NOM MODIFIÉ
╰───────────────✦

🏷️ Nouveau nom :
${event.body}
`);
		}

		if (Reply.type == "changeEmoji") {

			api.changeThreadEmoji(event.body, event.threadID);

			return message.reply(`
╭───────────────✦
│ ✅ EMOJI MODIFIÉ
╰───────────────✦

😀 Nouvel emoji :
${event.body}
`);
		}

		if (Reply.type == "changeNickname") {

			await api.changeNickname(
				event.body,
				event.threadID,
				event.senderID
			);

			const user = await usersData.get(event.senderID);

			return message.reply(`
╭───────────────✦
│ ✅ SURNOM MODIFIÉ
╰───────────────✦

👤 ${user.name}
🏷️ Nouveau surnom :
${event.body}
`);
		}
	}
};
