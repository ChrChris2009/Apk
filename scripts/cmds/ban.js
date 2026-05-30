const { findUid } = global.utils;
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "ban",
	version: "1.5.2",
	author: "NTKhang",
		countDown: 5,
	role: 1,
		description: {
			vi: "Cấm thành viên khỏi box chat",
			en: "Bannir un membre du groupe"
	},
		category: "box chat",
	guide: {
			vi: " {pn} [@tag|uid|link|reply] [lý do]: Cấm"
				+ "\n {pn} unban [@tag|uid|link|reply]: Bỏ cấm"
				+ "\n {pn} list : Xem danh sách"
				+ "\n {pn} check: Kick người bị cấm",
			en: " {pn} [@tag|uid|link|reply] [raison]: Bannir"
				+ "\n {pn} unban [@tag|uid|link|reply]: Débannir"
				+ "\n {pn} list : Voir la liste"
				+ "\n {pn} check: Expulser les bannis"
	}
	},

	langs: {
	vi: {
			notFoundTarget: "Vui lòng tag/uid/link/reply người cần cấm",
			notFoundTargetUnban: "Vui lòng tag/uid/link/reply người cần bỏ cấm",
			userNotBanned: "Người ID %1 không bị cấm",
			unbannedSuccess: "Đã bỏ cấm %1",
			cantSelfBan: "Không thể tự cấm mình",
			cantBanAdmin: "Không thể cấm quản trị viên",
			existedBan: "Người này đã bị cấm",
			noReason: "Không có lý do",
			bannedSuccess: "Đã cấm %1",
			needAdmin: "Bot cần quyền QTV để kick",
			noName: "User Facebook",
			noData: "Không có ai bị cấm",
			listBanned: "Danh sách bị cấm trang %1/%2",
			content: "%1/ %2 (%3)\nLý do: %4\nThời gian: %5\n",
			needAdminToKick: "Thành viên %1 bị cấm nhưng bot không có QTV",
			bannedKick: "%1 đã bị cấm trước đó\nUID: %2\nLý do: %3\nThời gian: %4\nBot đã kick",
			invalidPage: "Số trang không hợp lệ"
	},
	en: {
			notFoundTarget: "⚠️ Veuillez taguer/mettre l'UID/lien FB ou répondre au message de la personne à bannir",
			notFoundTargetUnban: "⚠️ Veuillez taguer/mettre l'UID/lien FB ou répondre au message de la personne à débannir",
			userNotBanned: "⚠️ L'utilisateur avec l'ID %1 n'est pas banni de ce groupe",
			unbannedSuccess: "✅ %1 a été débanni du groupe!",
			cantSelfBan: "⚠️ Tu ne peux pas te bannir toi-même!",
			cantBanAdmin: "❌ Tu ne peux pas bannir un administrateur!",
			existedBan: "❌ Cette personne est déjà bannie!",
			noReason: "Aucune raison",
			bannedSuccess: "✅ %1 a été banni du groupe!",
			needAdmin: "⚠️ Le bot a besoin des droits admin pour expulser les membres bannis",
			noName: "Utilisateur Facebook",
			noData: "📑 Aucun membre banni dans ce groupe",
			listBanned: "📑 Liste des membres bannis - Page %1/%2",
			content: "%1/ %2 (%3)\nRaison: %4\nDate: %5\n",
			needAdminToKick: "⚠️ Le membre %1 (%2) est banni mais le bot n'a pas les droits admin pour l'expulser",
			bannedKick: "⚠️ %1 était déjà banni du groupe!\nUID: %2\nRaison: %3\nDate: %4\nLe bot l'a automatiquement expulsé",
			invalidPage: "Numéro de page invalide"
	}
	},

	onStart: async function ({ message, event, args, threadsData, getLang, usersData, api }) {
		const { threadID, senderID } = event;
		const { members, adminIDs } = await threadsData.get(threadID);
		const botID = api.getCurrentUserID();
		const dataBanned = await threadsData.get(threadID, 'data.banned_ban') || [];

		function frame(text) {
			return `
❖ ── ✦ ──『⚠️』── ✦ ── ❖

${text}
❖ ── ✦ ──『⚠️』── ✦ ── ❖

`;
	}

		function getTarget() {
			if (event.messageReply?.senderID) return event.messageReply.senderID;
			if (Object.keys(event.mentions || {}).length) return Object.keys(event.mentions)[0];
			if (!isNaN(args[1])) return args[1];
			if (args[1]?.startsWith('https')) return findUid(args[1]);
			return null;
	}

		const timeNow = moment().tz("Africa/Kinshasa").format('HH:mm:ss DD/MM/YYYY');

	// DÉBAN
		if (args[0] == 'unban') {
			const target = getTarget();
			if (!target) return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
╭── ⚠️ 𝗘𝗿𝗲𝘂𝗿 ───
│ ${getLang('notFoundTargetUnban')}
╰──────────────────`));

			const index = dataBanned.findIndex(item => item.id == target);
			if (index == -1) return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
╭── ℹ️ 𝗜𝗻𝗳𝗼 ───
│ ${getLang('userNotBanned', target)}
╰──────────────────`));

			dataBanned.splice(index, 1);
			await threadsData.set(threadID, dataBanned, 'data.banned_ban');
			const userName = members.find(m => m.userID == target)?.name || await usersData.getName(target) || getLang('noName');
			
			return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── ✅ 𝗗𝗲́𝗯𝗮𝗻𝗶 𝗔𝘃𝗲𝗰 𝗦𝘂𝗰𝗲̀𝘀 ───
│ 👤 ${userName}
│ 🆔 ${target}
│ ✨ Statut: Débanni
╰──────────────────
━━━━━━━ ✕ ━━━━━━`));
	}

	// VÉRIFIER + KICK
		if (args[0] == "check") {
			if (!dataBanned.length) return message.reply(getLang('noData'));
			if (!adminIDs.includes(botID)) return message.reply(getLang('needAdmin'));
			
			let kicked = 0;
			for (const user of dataBanned) {
				if (event.participantIDs.includes(user.id)) {
					await api.removeUserFromGroup(user.id, threadID);
					kicked++;
				}
			}
			return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
╭── 🧹 𝗩𝗲́𝗿𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗧𝗲𝗿𝗺𝗶𝗻𝗲́𝗲 ───
│ 🚫 ${kicked} utilisateur(s) expulsé(s)
╰──────────────────`));
	}

	// LISTE
		if (args[0] == 'list') {
			if (!dataBanned.length) return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
╭── 📑 𝗟𝗶𝘀𝘁𝗲 𝗩𝗶𝗱𝗲 ───
│ ${getLang('noData')}
╰──────────────────`));

			const limit = 10;
			const page = parseInt(args[1]) || 1;
			const totalPage = Math.ceil(dataBanned.length / limit);
			if (page < 1 || page > totalPage) return message.reply(getLang('invalidPage'));
			
			const start = (page - 1) * limit;
			const data = dataBanned.slice(start, start + limit);
			
			let msg = `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 🚫 𝗟𝗶𝘀𝘁𝗲 𝗗𝗲𝘀 𝗕𝗮𝗻𝗶𝘀 ───\n`;
			
			let count = 0;
			for (const user of data) {
				count++;
				const name = members.find(m => m.userID == user.id)?.name || await usersData.getName(user.id) || getLang('noName');
				msg += `│ ${start + count}. ${name}\n│ 🆔 ${user.id}\n│ 📝 ${user.reason}\n│ ⏰ ${user.time}\n│\n`;
			}
			
			msg += `│ ${getLang('listBanned', page, totalPage)}\n╰──────────────────
━━━━━━━ ✕ ━━━━━━`;
			
			return message.reply(frame(msg));
	}

	// BAN
		let target;
		let reason;

		if (event.messageReply?.senderID) {
			target = event.messageReply.senderID;
			reason = args.join(' ');
	}
		else if (Object.keys(event.mentions || {}).length) {
			target = Object.keys(event.mentions)[0];
			reason = args.slice(1).join(' ');
	}
		else if (!isNaN(args[0])) {
			target = args[0];
			reason = args.slice(1).join(' ');
	}
		else if (args[0]?.startsWith('https')) {
			target = await findUid(args[0]);
			reason = args.slice(1).join(' ');
	}

		if (!target) return message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
╭── ⚠️ 𝗘𝗿𝗲𝘂𝗿 ───
│ ${getLang('notFoundTarget')}
╰──────────────────`));
		
		if (target == senderID) return message.reply(getLang('cantSelfBan'));
		if (adminIDs.includes(target)) return message.reply(getLang('cantBanAdmin'));
		if (dataBanned.find(item => item.id == target)) return message.reply(getLang('existedBan'));

		const name = members.find(m => m.userID == target)?.name || await usersData.getName(target) || getLang('noName');
		const data = {
			id: target,
			time: timeNow,
			reason: reason || getLang('noReason')
	};

		dataBanned.push(data);
		await threadsData.set(threadID, dataBanned, 'data.banned_ban');

		message.reply(frame(`🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 🚫 𝗕𝗮𝗻 𝗔𝗽𝗹𝗶𝗾𝘂𝗲́ ───
│ 👤 ${name}
│ 🆔 ${target}
│ 📝 Raison: ${data.reason}
│ ⏰ ${timeNow}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`), () => {
			if (members.some(item => item.userID == target)) {
				if (adminIDs.includes(botID)) {
					if (event.participantIDs.includes(target))
						api.removeUserFromGroup(target, threadID);
				} else {
					api.sendMessage(getLang('needAdmin'), threadID, (err, info) => {
						global.GoatBot.onEvent.push({
							messageID: info.messageID,
							onStart: ({ event }) => {
								if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
									const { TARGET_ID } = event.logMessageData;
									if (TARGET_ID == botID) {
										api.removeUserFromGroup(target, threadID);
										global.GoatBot.onEvent = global.GoatBot.onEvent.filter(item => item.messageID!= info.messageID);
									}
								}
							}
						});
					});
				}
			}
	});
	},

	onEvent: async function ({ event, api, threadsData, getLang, message }) {
		if (event.logMessageType == "log:subscribe") {
			const { threadID } = event;
			const dataBanned = await threadsData.get(threadID, 'data.banned_ban') || [];
			const botID = api.getCurrentUserID();
			const { adminIDs } = await threadsData.get(threadID);

			for (const user of event.logMessageData.addedParticipants) {
				const banned = dataBanned.find(item => item.id == user.userFbId);
				if (banned) {
					if (!adminIDs.includes(botID)) {
						return api.sendMessage(getLang('needAdminToKick', user.fullName, user.userFbId), threadID);
					}
					api.removeUserFromGroup(user.userFbId, threadID, err => {
						if (err) {
							api.sendMessage(getLang('needAdminToKick', user.fullName, user.userFbId), threadID);
						} else {
							api.sendMessage(getLang('bannedKick', user.fullName, user.userFbId, banned.reason, banned.time), threadID);
						}
					});
				}
			}
	}
	}
};
