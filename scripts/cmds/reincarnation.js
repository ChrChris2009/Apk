const fs = require("fs-extra");

const botName = "Minato Namikaze";

module.exports = {
	config: {
		name: "reincarnation",
		version: "1.1",
		author: "chris st",
		countDown: 5,
		role: 2,

		description: {
			vi: "Khởi động lại bot",
			en: "Réincarné minato"
		},

		category: "Owner",

		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   restart : Redémarrer le bot"
		}
	},

	langs: {
		en: {

			restartting:
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── 🔄 𝗥𝗲𝗱𝗲́𝗺𝗮𝗿𝗿𝗮𝗴𝗲 ───
│ ⚡ ${botName}
│ 𝚛𝚎𝚍é𝚖𝚊𝚛𝚛𝚎 𝚕𝚎 𝚜𝚢𝚜𝚝è𝚖𝚎.
│
│ ⏳ 𝚅𝚎𝚞𝚒𝚕𝚕𝚎𝚣 𝚙𝚊𝚝𝚒𝚎𝚗𝚝𝚎𝚛...
╰──────────────────
━━━━━━━ ✕ ━━━━━━`,

			restarted:
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── ✅ 𝗦𝘆𝘀𝘁𝗲̀𝗺𝗲 𝗢𝗻𝗹𝗶𝗻𝗲 ───
│ 🤖 ${botName}
│ 𝚎𝚜𝚝 𝚖𝚊𝚒𝚗𝚝𝚎𝚗𝚊𝚗𝚝
│ 𝚛𝚎𝚌𝚘𝚗𝚗𝚎𝚌𝚝é.
│
│ ⏰ 𝚃𝙴𝙼𝙿𝚂 : %1 seconde(s)
╰──────────────────
━━━━━━━ ✕ ━━━━━━`
		}
	},

	onLoad: function ({ api }) {

		const pathFile =
`${__dirname}/tmp/restart.txt`;

		if (fs.existsSync(pathFile)) {

			const [tid, time] =
				fs.readFileSync(
					pathFile,
					"utf-8"
				).split(" ");

			const totalTime =
				((Date.now() - time) / 1000)
				.toFixed(2);

			api.sendMessage(
`🚀 ❲ ${botName} ❳ 🚀
━━━━━━━━━━━━━━━
╭── ✅ 𝗦𝘆𝘀𝘁𝗲̀𝗺𝗲 𝗢𝗻𝗹𝗶𝗻𝗲 ───
│ 🤖 ${botName}
│ 𝚎𝚜𝚝 𝚖𝚊𝚒𝚗𝚝𝚎𝚗𝚊𝚗𝚝
│ 𝚛𝚎𝚌𝚘𝚗𝚗𝚎𝚌𝚝é..
│
│ ⏰ Temps : ${totalTime}s
╰──────────────────
━━━━━━━ ✕ ━━━━━━`,
				tid
			);

			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({
		message,
		event,
		getLang
	}) {

		const pathFile =
`${__dirname}/tmp/restart.txt`;

		fs.writeFileSync(
			pathFile,
			`${event.threadID} ${Date.now()}`
		);

		await message.reply(
			getLang("restartting")
		);

		process.exit(2);
	}
};
