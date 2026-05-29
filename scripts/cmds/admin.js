const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "admin",
	version: "1.7",
	author: "NTKhang + modifié",
		countDown: 5,
	role: 2,
		description: {
			fr: "Ajouter, supprimer, lister les admins du bot"
	},
		category: "box chat",
	guide: {
			fr: ' {pn} [add | -a] <uid | @tag> : Ajouter un admin'
				+ '\n {pn} [remove | -r] <uid | @tag> : Supprimer un admin'
				+ '\n {pn} [list | -l] : Lister tous les admins'
	}
	},

	langs: {
	fr: {
			added: "✅ Ajouté en admin %1 utilisateur(s) :\n%2",
			alreadyAdmin: "\n⚠️ %1 utilisateur(s) sont déjà admin :\n%2",
			missingIdAdd: "⚠️ Veuillez entrer l'ID ou taguer l'utilisateur à ajouter en admin",
			removed: "✅ Supprimé du rôle admin %1 utilisateur(s) :\n%2",
			notAdmin: "⚠️ %1 utilisateur(s) ne sont pas admin :\n%2",
			missingIdRemove: "⚠️ Veuillez entrer l'ID ou taguer l'utilisateur à retirer du rôle admin",
			listAdmin: "👑 Liste des admins :\n%1"
	}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {
		
		const frame = (title, content) => {
			return `🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── 💬 ${title} ───
${content}
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;
	};

		const getUserInfo = async (uid) => {
			try {
				const name = await usersData.getName(uid);
				return `│ 👤 ${name}\n│ ID: ${uid}\n│ Profil: https://facebook.com/${uid}`;
			} catch {
				return `│ 👤 Uid: ${uid}\n│ ID: ${uid}\n│ Profil: https://facebook.com/${uid}`;
			}
	};

		switch (args[0]) {
			case "add":
			case "-a": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg =>!isNaN(arg));

					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					config.adminBot.push(...notAdminIds);
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

					let msg = "";
					if (notAdminIds.length > 0) {
						const infos = await Promise.all(notAdminIds.map(getUserInfo));
						msg += getLang("added", notAdminIds.length, infos.join("\n│\n")) + "\n│\n";
					}
					if (adminIds.length > 0) {
						const infos = await Promise.all(adminIds.map(getUserInfo));
						msg += getLang("alreadyAdmin", adminIds.length, infos.join("\n│\n"));
					}

					return message.reply(frame("Ajout Admin", msg));
				}
				else
					return message.reply(frame("Erreur", `│ ${getLang("missingIdAdd")}`));
			}

			case "remove":
			case "-r": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg =>!isNaN(arg));

					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					for (const uid of adminIds)
						config.adminBot.splice(config.adminBot.indexOf(uid), 1);

					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

					let msg = "";
					if (adminIds.length > 0) {
						const infos = await Promise.all(adminIds.map(getUserInfo));
						msg += getLang("removed", adminIds.length, infos.join("\n│\n")) + "\n│\n";
					}
					if (notAdminIds.length > 0) {
						const infos = await Promise.all(notAdminIds.map(getUserInfo));
						msg += getLang("notAdmin", notAdminIds.length, infos.join("\n│\n"));
					}

					return message.reply(frame("Suppression Admin", msg));
				}
				else
					return message.reply(frame("Erreur", `│ ${getLang("missingIdRemove")}`));
			}

			case "list":
			case "-l": {
				const infos = await Promise.all(config.adminBot.map(getUserInfo));
				const msg = getLang("listAdmin", infos.join("\n│\n"));
				return message.reply(frame("Liste Admin", msg));
			}

			default:
				return message.reply(frame("Aide", "│ Utilise : add, remove, list"));
	}
	}
};
