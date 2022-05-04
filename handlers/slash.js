const fs = require("fs");

module.exports = (client) => {
  fs.readdirSync("./slash/").map(async (dir) => {
    fs.readdirSync(`./slash/${dir}/`).map(async (cmd) => {
      let pull = require(`../slash/${dir}/${cmd}`);
      client.slash.set(pull.name, pull);
      client.logger.log(`> ➕ • Slash ${pull.name} foi carregado.`, "cmd");
    });
  });
};
