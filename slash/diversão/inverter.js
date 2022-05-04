const discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "inverter",
  description: "Inverta o avatar de algum usuário ou o seu!",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    const member =
      interaction.options.getMember("usuário") || interaction.member;
    const image = await Canvas.loadImage(await member.user.displayAvatarURL({ dynamic: true, size: 4096, format: "png" }));
    const canvas = await Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = 255 - imgData.data[i];
      imgData.data[i + 1] = 255 - imgData.data[i + 1];
      imgData.data[i + 2] = 255 - imgData.data[i + 2];
      imgData.data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);

    let attachment = new discord.MessageAttachment(
        canvas.toBuffer(),
        "inverter.png"
      );
      interaction.reply({ files: [attachment] });
  },
};
