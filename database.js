const { connect, Schema, model } = require("mongoose");
let logger = require("./Utils/logger")
connect(
  `mongodb+srv://${process.env.db}:${process.env.db}@cluster0-ovyzb.gcp.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => logger.log(`> ✅ • Carregado com sucesso [BANCO DE DADOS]`, "success"))
  .catch(() =>
    console.log("[ERRO] | Não foi possível se conectar ao banco de dados.")
  );

const UserSchema = new Schema({
  _id: { type: String, required: true },
  punishments: {
    mutes: { type: Array, default: [] },
    autobot: { type: Array, default: [] }
  },
  biografia: {
    type: String,
    default: "Olhe para mim, sou uma linda borbuleta! Use a?biografia <bio> para definir uma biografia nova."
  },
  casado: { type: Array, default: "Solteiro" },
  animecoins: { type: Number, default: 0 },
  dinsujo: { type: Number, default: 0 },
  dailyCooldown: { type: Number, default: 0 },
  repCooldown: { type: Number, default: 0 },
  roubarCooldown: { type: Number, default: 0 },
  trabalharCooldown: { type: Number, default: 0 },
  crimeCooldown: { type: Number, default: 0 },
  clonaCooldown: { type: Number, default: 0 },
  rep: { type: Number, default: 0 },
  cor: { type: String, default: "#69cf65" },
  coratm: { type: String, default: "#27AE60" },
  medalhas: {
    natalv1: { type: Boolean, default: false }
  },
  loja: {
    cidadenoite: { type: String, default: "Comprado." },
    garotamascara: { type: String, default: "Não comprado." },
    bellcraner: { type: String, default: "Não comprado." },
    tanjironezuko: { type: String, default: "Não comprado." },
    nakiriayame: { type: String, default: "Não comprado." },
    kanna: { type: String, default: "Não comprado." },
    megumin: { type: String, default: "Não comprado." },
    shinobu: { type: String, default: "Não comprado." },
    gokublack: { type: String, default: "Não comprado." },
    satorugojo: { type: String, default: "Não comprado." },
    space: { type: String, default: "Não comprado." },
    akaza: { type: String, default: "Não comprado." },
    akazoficial: { type: String, default: "Não comprado." },
    douma1: { type: String, default: "Não comprado." },
    cybergirl: { type: String, default: "Não comprado." },
    koalas: { type: String, default: "Não comprado."},
    keitaro: { type: String, default: "Não comprado."},
    saokirito: { type: String, default: "Não comprado."},
    hantengu: { type: String, default: "Não comprado."},
    makisan: { type: String, default: "Não comprado."},
    floresta: { type: String, default: "Não comprado."},
    rengoku: { type: String, default: "Não comprado."},
    bartsimpson: { type: String, default: "Não comprado."},
    supersaiyajin: { type: String, default: "Não comprado."},
    raiden: { type: String, default: "Não comprado."},
    nossoamor: { type: String, default: "Não comprado."},
    arcane: { type: String, default: "Não comprado." }
  },
  equipado: { type: String, default: "cidadenoite" },
  config: {
    protecaoroleta: { type: String, default: "ON" },
    protecaoraspadinha: { type: String, default: "ON" },
    notificarep: { type: Boolean, default: false },
    notificarob: { type: Boolean, default: false },
    notificarwork: { type: Boolean, default: false },
    notificardaily: { type: Boolean, default: false },
	notificarcrime: { type: Boolean, default: false }
  },
});

const BaninfoSchema = new Schema({
  _id: { type: String, required: true },
  motivo: { type: String, default: "Sem motivo informado." },
  data: { type: String, required: true },
  autor: { type: String, default: "Equipe AnimesOnline.Games" },
  banido: { type: String, required: true },
  provas: { type: Array, default: [] }
});

const LevelSchema = new Schema({
  userID: { type: String },
  guildID: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: new Date() }
});

const guildSchema = new Schema({
  _id: { type: String, required: true },
  diadocalendario: { type: String, default: "sabádo" },
  manutencao: { type: Boolean, default: false },
  notifylanca: { type: Boolean, default: false },
  ytdata: { type: String, default: "" },
  newsdata: { type: String, default: "" },
  lancadata: { type: String, default: "" },
  lancahdata: { type: String, default: "" },
  repschedule: [{
    _id: { type: String },
    schedule: { type: Date }
  }],
  dailyschedule: [{
    _id: { type: String },
    schedule: { type: Date }
  }],
  workschedule: [{
    _id: { type: String },
    schedule: { type: Date }
  }],
  robschedule: [{
    _id: { type: String },
    schedule: { type: Date }
  }],
  crimeschedule: [{
	_id: { type: String },
	schedule: { type: Date }
  }]
})

const HalloweenSchema = new Schema({
  _id: { type: String, required: true },
  candy: { type: Number, default: 0 }
});

module.exports.BanInfo = model("BanInfo", BaninfoSchema);
module.exports.Halloween = model("Halloween", HalloweenSchema);
module.exports.Users = model("Users", UserSchema);
module.exports.Levels = model("Levels", LevelSchema);
module.exports.Guilds = model("Guilds", guildSchema);