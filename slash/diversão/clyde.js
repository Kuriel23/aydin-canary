const discord = require("discord.js");
const Canvas = require("canvas");
const moment = require("moment");
moment.locale("pt-BR");
const emoji = require("@canvacord/emoji-parser");

module.exports = {
  name: "clyde",
  description: "Clyde lhe mandou uma mensagem, né?",
  options: [
    {
      name: "mensagem",
      description: "O que o Clyde devia mandar?",
      type: 3,
      required: true,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    await interaction.reply({ content: "Gerando imagem..." })
    let avatar = await Canvas.loadImage("https://i.imgur.com/TQmLGI9.png");
    let badge = await Canvas.loadImage("https://i.imgur.com/4yrOIfA.png");
    Canvas.registerFont("./fonts/WHITNEY_MEDIUM.otf", {
      family: "Whitney",
      weight: "regular",
      style: "normal",
    });

    Canvas.registerFont("./fonts/MANROPE_REGULAR.ttf", {
      family: "Manrope",
      weight: "regular",
      style: "normal",
    });

    const canvas = Canvas.createCanvas(1500, 300);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#36393E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(avatar, 75, 30, 130, 130);
    ctx.drawImage(badge, 360, 45, 100, 40);

    let analisar = interaction.options.get("mensagem").value;
    let text;
    if (typeof analisar !== "string") return "";
    if (analisar.length <= 66) text = interaction.options.get("mensagem").value;
    else text = analisar.substr(0, len).trim() + "...";

    async function renderEmoji(ctx, message, x, y) {
      return await emoji.fillTextWithTwemoji(ctx, message, x, y);
    };

    ctx.font = "40px Manrope";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    await renderEmoji(ctx, analisar, 230, 150);

    ctx.font = "50px Whitney";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.fillText("Clyde", 230, 80);

    ctx.font = "40px Whitney";
    ctx.fillStyle = "#7D7D7D";
    ctx.textAlign = "start";
    ctx.fillText("Hoje ás " + moment().format("LT"), 470, 80);

    ctx.font = "20px Manrope";
    ctx.fillStyle = "#7D7D7D";
    ctx.textAlign = "start";
    ctx.fillText("Só você pode ver esta  —", 240, 190);

    ctx.font = "20px Manrope";
    ctx.fillStyle = "#2785C7";
    ctx.textAlign = "start";
    ctx.fillText(
      "Ignorar mensagem.",
      240 + ctx.measureText("Só você pode ver esta  —").width + 10,
      190
    );

    let attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      "clyde.png"
    );
    interaction.editReply({ content: "Gerado com sucesso!", files: [attachment] });
  },
};
