const app = require("express")();
module.exports = function (client) {
  app.get("/loja.json", (req, res) => res.json(require("./loja.json")));

  app.get("/fanart.json", (req, res) => res.json(require("./fanart.json")));

  app.get("/", (req, res) => res.sendStatus(200));

  app.listen(4000, () =>
    client.logger.log("> ✅ • Carregado com sucesso [EXPRESS]", "success")
  );
};
