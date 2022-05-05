const discord = require("discord.js");
const jimp = require("jimp");

module.exports = {
  name: "primeiraspalavras",
  description: "Fale as primeiras palavras do bebê!",
  options: [
    {
      name: "mensagem",
      description: "O que o bebê deve falar?",
      type: 3,
      required: true,
    },
  ],
  category: "diversão",
  run: async (interaction, client) => {
    await interaction.reply({ content: "Gerando imagem..." })
    let img = jimp.read("https://i.imgur.com/7HeAhEk.png");
    img.then((image) => {
      jimp.loadFont(jimp.FONT_SANS_32_BLACK).then((font) => {
        image.resize(485, 450);
        image.print(font, 10, 230, interaction.options.get("mensagem").value, 330);
        image.getBuffer(jimp.MIME_PNG, (err, i) => {
          image.write("primeiras.png");
          const attachment = new discord.MessageAttachment('primeiras.png', 'primeiraspalavras.png');
          interaction.editReply({ content: null, files: [attachment] });
        });
      });
    });
  },
};
