const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const path = require('path');
let logger = require("./Utils/logger");

const commands = []
readdirSync("./slash/").map(async dir => {
	readdirSync(`./slash/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./slash/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "9" }).setToken(process.env.token);

(async () => {
	try {
        logger.log(`> ⚡ • Slash commands começou a carregar.`, "info")
		await rest.put(
			Routes.applicationCommands(process.env.clientID),
			{ body: commands },
		);
        logger.log(`> ✅ • Todos os slash commands foram recarregados.`, "success")
	} catch (error) {
		console.error(error);
	}
})();