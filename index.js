const discord = require("discord.js");
require("dotenv").config();

const client = new discord.Client({
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  intents: 32767,
  allowedMentions: {
    parse: ["users"],
    repliedUser: true,
  },
  cacheWithLimits: {
    MessageManager: {
      sweepInterval: 300,
      sweepFilter: discord.Sweepers.filterByLifetime({
        lifetime: 60,
        getComparisonTimestamp: (m) => m.editedTimestamp ?? m.createdTimestamp,
      }),
    },
  },
});

client.db = require("./database.js");
client.cor = "#27AE60";
client.games = "https://animesonlinegames.com/";
client.orion = "https://animesorionvip.com/";
client.hd = "https://myanimelist.vip/";
client.goyabu = "https://goyabu.vip/";
client.sh = "https://superhentaisvip.net/";
client.ok = "https://i.imgur.com/01u54sR.png";
client.warn = "https://i.imgur.com/8gktqyJ.png";
client.err = "https://i.imgur.com/NGy07fZ.png";
client.welcome = "675087693474168864";
client.logger = require("./Utils/logger");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.slash = new discord.Collection();
client.request = new (require("rss-parser"))();
client.loja = require("./loja.json");
client.catToken = process.env.catToken;

client.eventoativo = false; // true para ativar, false para desativar
client.quantiacandy = 5; // Quantia que é doada
client.nomeevento = "NATAL"; // Nome do Evento em CAPS LOCK
client.moeda = "presentes"; // Nomeie as moedas do evento
client.vermoeda = "presentes"; // Comando para ver quantia de moedas
client.iconurl = "https://cdn-icons-png.flaticon.com/512/1404/1404946.png" // Customize o icon que é mostrado nas Embeds. 

require(`./handlers/commands`)(client);
require(`./handlers/events`)(client);
require(`./handlers/slash`)(client);
require("./slash");

client.on("error", (error) => client.logger.log(error, "error"));
client.on("warn", (info) => client.logger.log(info, "warn"));
/*process.on('unhandledRejection', error => client.logger.log("UNHANDLED_REJECTION\n" + error, "error"));
process.on('uncaughtException', error => {
    client.logger.log("UNCAUGHT_EXCEPTION\n" + error, "error");
    client.logger.log("Uncaught Exception foi detectado, reiniciando...", "info");
    process.exit(1);
});*/

client.login(process.env.token).catch(() => {
  client.logger.log("Token Inválido!", "warn");
});
