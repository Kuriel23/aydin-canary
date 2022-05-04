const fs = require("fs");

module.exports = (client) => {

    const eventFiles = fs.readdirSync(`./events/`).filter((file) => file.endsWith(".js"));

    for (let file of eventFiles) {
        try {
            const Event = require(`../events/${file}`);
            Event.event = Event.event || file.replace(".js", "")
            client.on(file.split(".")[0], (...args) => Event(client, ...args));
            client.logger.log(`> ➕ • Evento ${file.replace(".js", "")} foram carregados.`, "event");
        } catch (err) {
            client.logger.log("Erro enquanto carregava", "warn")
            client.logger.log(err, "error");
        }
    }
    client.logger.log(`> ✅ • Carregado com sucesso [EVENTO]`, "success");
};
