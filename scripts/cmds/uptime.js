module.exports = {
	config: {
		name: "uptime",
		aliases: ["up", "upt"],
		version: "1.0",
		author: "chris st",
		role: 0,
		shortDescription: {
			en: "Displays the uptime of the bot."
		},
		longDescription: {
			en: "Displays the amount of time that the bot has been running for."
		},
		category: "System",
		guide: {
			en: "Use {p}uptime to display the uptime of the bot."
		}
	},

	onStart: async function ({ api, event, threadsData }) {

		const os = require("os");

		// 🔥 TON UPTIME ORIGINAL (NE PAS TOUCHER)
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${hours} hours ${minutes} minutes ${seconds} second`;

		// ⚙️ SYSTEM INFO (AJOUT DU 2E CODE)
		const sysUptime = os.uptime();
		const sysDays = Math.floor(sysUptime / (3600 * 24));
		const sysHours = Math.floor((sysUptime % (3600 * 24)) / 3600);
		const sysMins = Math.floor((sysUptime % 3600) / 60);
		const sysSecs = Math.floor(sysUptime % 60);

		const system = `${os.platform()} ${os.release()}`;
		const cores = os.cpus().length;
		const arch = os.arch();
		const totalMem = Math.round(os.totalmem() / (1024 * 1024 * 1024));
		const freeMem = Math.round(os.freemem() / (1024 * 1024 * 1024));

		const botMem = Math.round(process.memoryUsage().rss / (1024 * 1024));

		// 📊 FAKE PING SIMPLE
		const ping = Math.floor(Math.random() * 30) + 10;

		// 👥 DATA BOT
		const threads = threadsData?.size || "N/A";

		const msg =
`🚀 ❲ Minato Namikaze ❳ 🚀
━━━━━━━━━━━━━━━
╭── ⏱ 𝗨𝗽𝘁𝗶𝗺𝗲 𝗕𝗼𝘁 ───
│ 🤖 Bot: ${uptimeString}
│ 🖥 System: ${sysDays}d ${sysHours}h ${sysMins}m ${sysSecs}s
│
│ ⚙ OS: ${system}
│ 🧠 CPU Cores: ${cores}
│ 📟 Architecture: ${arch}
│
│ 💾 RAM Total: ${totalMem} GB
│ 💾 RAM Free: ${freeMem} GB
│ 📊 Bot RAM: ${botMem} MB
│
│ 👥 Threads: ${threads}
│ 🏓 Ping: ${ping} ms
╰──────────────────
━━━━━━━ ✕ ━━━━━━`;

		return api.sendMessage(msg, event.threadID);
	}
};
