const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "count",
	version: "1.4",
	author: "chris st",
		countDown: 5,
	role: 0,
		description: {
			fr: "Voir le nombre de messages de tous les membres ou de toi-même"
	},
		category: "box chat",
	guide: {
			fr: " {pn} : voir ton nombre de messages"
				+ "\n {pn} @tag : voir le nombre de messages des personnes taguées"
				+ "\n {pn} all : voir le nombre de messages de tous les membres"
	}
	},

	langs: {
	fr: {
			count: "Nombre de messages des membres",
			endMessage: "Ceux qui ne sont pas dans la liste n'ont envoyé aucun message.",
			page: "Page [%1/%2]",
			reply: "Réponds à ce message avec le numéro de page pour voir la suite",
			result: "%1 rang %2 avec %3 messages",
			yourResult: "Tu es classé %1 et tu as envoyé %2 messages dans ce groupe",
			invalidPage: "Numéro de page invalide",
			noMessage: "Tu n'as encore envoyé aucun message."
	}
	},

	onStart: async function ({ args, threadsData, message, event, api, commandName, getLang }) {
		const { threadID, senderID } = event;
		const threadData = await threadsData.get(threadID);
		const { members } = threadData;
		const usersInGroup = (await api.getThreadInfo(threadID)).participantIDs;
		
		let arraySort = [];
		for (const user of members) {
			if (!usersInGroup.includes(user.userID))
				continue;
			const charac = "️";
			arraySort.push({
				name: user.name.includes(charac)? `Uid: ${user.userID}` : user.name,
				count: user.count,
				uid: user.userID
			});
	}
		
		let stt = 1;
		arraySort.sort((a, b) => b.count - a.count);
		arraySort.map(item => item.stt = stt++);

	// Fonction pour générer le cadre
		const frame = (title, content) => {
			return `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 💬 ${title} ───
${content}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;
	};

		if (args[0]) {
			if (args[0].toLowerCase() == "all") {
				let msg = "";
				const endMessage = getLang("endMessage");
				
				for (const item of arraySort) {
					if (item.count > 0)
						msg += `│ #${item.stt} ${item.name}: ${item.count}\n`;
				}

				if ((msg + endMessage).length > 19999) {
					msg = "";
					let page = parseInt(args[1]);
					if (isNaN(page))
						page = 1;
					const splitPage = global.utils.splitPage(arraySort, 50);
					arraySort = splitPage.allPage[page - 1];
					
					for (const item of arraySort) {
						if (item.count > 0)
							msg += `│ #${item.stt} ${item.name}: ${item.count}\n`;
					}
					
					msg += `│\n│ ${getLang("page", page, splitPage.totalPage)}\n│ ${getLang("reply")}\n│\n│ ${endMessage}`;

					const finalMsg = frame(getLang("count"), msg);

					return message.reply(finalMsg, (err, info) => {
						if (err)
							return message.err(err);
						global.GoatBot.onReply.set(info.messageID, {
							commandName,
							messageID: info.messageID,
							splitPage,
							author: senderID
						});
					});
				}
				
				const finalMsg = frame(getLang("count"), msg);
				message.reply(finalMsg);
			}
			else if (event.mentions) {
				let msg = "";
				for (const id in event.mentions) {
					const findUser = arraySort.find(item => item.uid == id);
					if (findUser)
						msg += `│ #${findUser.stt} ${findUser.name}: ${findUser.count} messages\n`;
				}
				
				const finalMsg = frame("Résultat", msg);
				message.reply(finalMsg);
			}
	}
		else {
			const findUser = arraySort.find(item => item.uid == senderID);
			if (!findUser) return message.reply(frame("Erreur", `│ ${getLang("noMessage")}`));
			
			const msg = `│ Rang: #${findUser.stt}\n│ Messages: ${findUser.count}\n│ Groupe: ${event.threadID}`;
			const finalMsg = frame("Tes Statistiques", msg);
			return message.reply(finalMsg);
	}
	},

	onReply: ({ message, event, Reply, commandName, getLang }) => {
		const { senderID, body } = event;
		const { author, splitPage } = Reply;
		if (author!= senderID)
			return;
		
		const page = parseInt(body);
		if (isNaN(page) || page < 1 || page > splitPage.totalPage)
			return message.reply(frame("Erreur", `│ ${getLang("invalidPage")}`));
		
		let msg = "";
		const endMessage = getLang("endMessage");
		const arraySort = splitPage.allPage[page - 1];
		
		for (const item of arraySort) {
			if (item.count > 0)
				msg += `│ #${item.stt} ${item.name}: ${item.count}\n`;
	}
		
		msg += `│\n│ ${getLang("page", page, splitPage.totalPage)}\n│ ${getLang("reply")}\n│\n│ ${endMessage}`;
		
		const frame = (title, content) => {
			return `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 💬 ${title} ───
${content}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;
	};
		
		const finalMsg = frame(getLang("count"), msg);
		
		message.reply(finalMsg, (err, info) => {
			if (err)
				return message.err(err);
			message.unsend(Reply.messageID);
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				splitPage,
				author: senderID
			});
	});
	},

	onChat: async ({ usersData, threadsData, event }) => {
		const { senderID, threadID } = event;
		const members = await threadsData.get(threadID, "members");
		const findMember = members.find(user => user.userID == senderID);
		
		if (!findMember) {
			members.push({
				userID: senderID,
				name: await usersData.getName(senderID),
				nickname: null,
				inGroup: true,
				count: 1
			});
	}
		else
			findMember.count += 1;
		
		await threadsData.set(threadID, members, "members");
	}
};
