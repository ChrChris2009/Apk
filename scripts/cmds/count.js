module.exports = {
	config: {
		name: "count",
	version: "1.4",
	author: "chris st",
		countDown: 5,
	role: 0,
		description: {
			vi: "Xem số lượng tin nhắn của tất cả thành viên hoặc bản thân",
			en: "View message count of all members or yourself"
	},
		category: "box chat",
	guide: {
			vi: " {pn}: xem tin nhắn của bạn"
				+ "\n {pn} @tag: xem tin nhắn người được tag"
				+ "\n {pn} all [page]: xem top all",
			en: " {pn}: view your messages"
				+ "\n {pn} @tag: view tagged users"
				+ "\n {pn} all [page]: view leaderboard"
	}
	},

	langs: {
	vi: {
			count: "Bảng xếp hạng tin nhắn:",
			endMessage: "Người không có tên là chưa nhắn tin.",
			page: "Trang [%1/%2]",
			reply: "Reply số trang để xem tiếp",
			result: "%1 hạng %2 với %3 tin nhắn",
			yourResult: "Bạn hạng %1 với %2 tin nhắn",
			invalidPage: "Số trang không hợp lệ"
	},
	en: {
			count: "📊 Message Leaderboard:",
			endMessage: "Users not listed have sent 0 messages.",
			page: "Page [%1/%2]",
			reply: "Reply with page number to view more",
			result: "%1 → Rank %2 with %3 messages",
			yourResult: "You are Rank %1 with %2 messages",
			invalidPage: "Invalid page number"
	}
	},

	onStart: async function ({ args, threadsData, message, event, api, commandName, getLang, usersData }) {
		const { threadID, senderID } = event;

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

		const threadData = await threadsData.get(threadID);
		const { members } = threadData;
		const usersInGroup = (await api.getThreadInfo(threadID)).participantIDs;
		
		let arraySort = [];
		for (const user of members) {
			if (!usersInGroup.includes(user.userID)) continue;
			const charac = "️";
			arraySort.push({
				name: user.name.includes(charac)? `UID: ${user.userID}` : user.name,
				count: user.count || 0,
				uid: user.userID
			});
	}

		arraySort.sort((a, b) => b.count - a.count);
		arraySort = arraySort.map((item, i) => ({...item, stt: i + 1}));

	// User perso
		if (!args[0]) {
			const findUser = arraySort.find(item => item.uid == senderID);
			const count = findUser? findUser.count : 0;
			const rank = findUser? findUser.stt : "#N/A";
			const name = await usersData.getName(senderID);
			
			return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 📊 𝗩𝗼𝘀 𝗠𝗲𝘀𝗮𝗴𝗲𝘀 ───
│ 👤 Nom: ${name}
│ 🏆 Rank: #${rank}
│ 💬 Messages: ${formatNum(count)}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`));
	}

	// Mention users
		if (Object.keys(event.mentions).length > 0) {
			let msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 📊 𝗦𝘁𝗮𝘁𝘀 𝗨𝘀𝗲𝗿𝘀 ───\n`;
			for (const id in event.mentions) {
				const findUser = arraySort.find(item => item.uid == id);
				if (findUser) {
					msg += `│ 👤 ${findUser.name}\n│ 🏆 Rank: #${findUser.stt}\n│ 💬 ${formatNum(findUser.count)} messages\n│\n`;
				}
			}
			msg += `╰──────────────────
━━━━━━━ ✕ ━━━━━━`;
			return message.reply(frame(msg));
	}

	// All leaderboard
		if (args[0].toLowerCase() == "all") {
			const endMessage = getLang("endMessage");
			let page = parseInt(args[1]) || 1;
			const splitPage = global.utils.splitPage(arraySort, 15);
			
			if (page < 1 || page > splitPage.totalPage)
				return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
╭── ❌ 𝗘𝗿𝗲𝘂𝗿 ───
│ ${getLang("invalidPage")}
╰──────────────────`));

			arraySort = splitPage.allPage[page - 1];
			let msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 👑 𝗧𝗼𝗽 𝗠𝗲𝘀𝗮𝗴𝗲𝘂𝗿𝘀 ───\n`;
			
			for (const item of arraySort) {
				if (item.count > 0) {
					const medal = item.stt === 1? "🥇" : item.stt === 2? "🥈" : item.stt === 3? "🥉" : "💬";
					msg += `│ ${medal} #${item.stt} ${item.name}\n│ ${formatNum(item.count)} messages\n│\n`;
				}
			}
			
			msg += `│ ${getLang("page", page, splitPage.totalPage)}\n│ ${getLang("reply")}\n╰──────────────────\n${endMessage}
━━━━━━━ ✕ ━━━━━━`;

			return message.reply(frame(msg), (err, info) => {
				if (err) return;
				global.GoatBot.onReply.set(info.messageID, {
					commandName,
					messageID: info.messageID,
					splitPage,
					author: senderID
				});
			});
	}
	},

	onReply: async ({ message, event, Reply, commandName, getLang }) => {
		const { senderID, body } = event;
		const { author, splitPage } = Reply;
		if (author!= senderID) return;
		
		const page = parseInt(body);
		if (isNaN(page) || page < 1 || page > splitPage.totalPage)
			return message.reply(getLang("invalidPage"));

		function formatNum(num) {
			return num.toLocaleString("en-US");
	}

		function frame(text) {
			return `
❖ ── ✦ ──『✙』── ✦ ── ❖

${text}
❖ ── ✦ ──『✙』── ✦ ── ❖

`;
	}

		const arraySort = splitPage.allPage[page - 1];
		let msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 👑 𝗧𝗼𝗽 𝗠𝗲𝘀𝗮𝗴𝗲𝘂𝗿𝘀 ───\n`;
		
		for (const item of arraySort) {
			if (item.count > 0) {
				const medal = item.stt === 1? "🥇" : item.stt === 2? "🥈" : item.stt === 3? "🥉" : "💬";
				msg += `│ ${medal} #${item.stt} ${item.name}\n│ ${formatNum(item.count)} messages\n│\n`;
			}
	}
		
		msg += `│ ${getLang("page", page, splitPage.totalPage)}\n│ ${getLang("reply")}\n╰──────────────────\n${getLang("endMessage")}
━━━━━━━ ✕ ━━━━━━`;

		message.reply(frame(msg), (err, info) => {
			if (err) return;
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
		if (event.type!== "message") return;
		
		const members = await threadsData.get(threadID, "members") || [];
		const findMember = members.find(user => user.userID == senderID);
		
		if (!findMember) {
			members.push({
				userID: senderID,
				name: await usersData.getName(senderID),
				nickname: null,
				inGroup: true,
				count: 1
			});
	} else {
			findMember.count += 1;
	}
		await threadsData.set(threadID, members, "members");
	}
};
