const discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {
  name: "ship",
  description: "Será que você tem um potencial amor por aí?",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
      required: true,
    },
    {
      name: "usuário2",
      description: "Qual o segundo usuário?",
      type: 6,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    await interaction.reply({ content: "Gerando imagem..." });
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    let member2 =
      interaction.options.getMember("usuário2") || interaction.member;
    let member = interaction.options.getMember("usuário");

    const bg = await Canvas.loadImage("https://i.imgur.com/nGxS7GP.png");
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "png", size: 512, format: "png" })
    );
    ctx.drawImage(avatar, 100, 25, 200, 200);

    const TargetAvatar = await Canvas.loadImage(
      member2.displayAvatarURL({ format: "png", size: 512, format: "png" })
    );
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200);
    const random = Math.floor(Math.random() * 99) + 1;

    ctx.font = `28px Impact`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${random}%`, 325, 240);

    if (random >= 90) {
      const casamento = await Canvas.loadImage(
        "https://i.imgur.com/dotuEvv.png"
      );
      ctx.drawImage(casamento, 275, 60, 150, 150);
      const attachment = new discord.MessageAttachment(
        canvas.toBuffer(),
        "love.png"
      );
      return interaction.editReply({ content: null, files: [attachment] });
    }
    if (random >= 50 && random <= 89) {
      const heart = await Canvas.loadImage("https://i.imgur.com/YbpX831.png");
      ctx.drawImage(heart, 275, 60, 150, 150);
      const attachment = new discord.MessageAttachment(
        canvas.toBuffer(),
        "love.png"
      );
      return interaction.editReply({ content: null, files: [attachment] });
    }
    if (random <= 49) {
      const broken = await Canvas.loadImage("https://i.imgur.com/GY8EliC.png");
      ctx.drawImage(broken, 275, 60, 150, 150);
      const attachment = new discord.MessageAttachment(
        canvas.toBuffer(),
        "broken.png"
      );
      return interaction.editReply({ content: null, files: [attachment] });
    }
  },
};
