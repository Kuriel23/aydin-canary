const discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "laranjo",
  description: "Quem não adora usar o laranjo? Ele é parecido com uma laranja",
  options: [
    {
      name: "mensagem",
      description: "O que deve ser dito?",
      type: 3,
      required: true,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    interaction.reply({ content: "Gerando imagem..." })
    const canvas = Canvas.createCanvas(685, 494);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
      "https://i.imgur.com/nrxBMIg.png"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    context.font = `32px sans-serif`;
    context.fillStyle = "#000000";
    context.fillText(`${interaction.options.get("mensagem").value}`, 10, 40);
  
    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    let attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      "laranjo.png"
    );
    interaction.editReply({ content: "Gerado com sucesso!", files: [attachment] });
  },
};
