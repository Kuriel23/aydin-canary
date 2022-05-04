const discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "bater",
  description: "Bata em alguém com sua força",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
      required: true,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    const member = interaction.options.getMember("usuário");
    const canvas = Canvas.createCanvas(1000, 500);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("https://i.imgur.com/KhYCQVy.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: "png", size: 512 }));
    const avatar1 = await Canvas.loadImage(member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 512,
    }));
    ctx.drawImage(avatar1, 580, 260, 200, 200);
    ctx.drawImage(avatar, 350, 70, 220, 220);
    let attachment = new discord.MessageAttachment(canvas.toBuffer(), "slap.png");
    interaction.reply({ files: [attachment] });
  },
};
