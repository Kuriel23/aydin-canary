const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "gato",
  description: "Veja fotos de gatos :)",
  category: "diversão",
  run: async (interaction, client) => {
    const { body } = await superagent.get(
      "https://api.thecatapi.com/v1/images/search?format=json&mime_types=png,jpg,gif"
    );
    let CatEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: "» Gatos são apenas uma fofura!",
        iconURL: "https://i.imgur.com/RmiSuFV.png",
      })
      .setImage(body[0].url)
      .setColor(client.cor);
    interaction.reply({ embeds: [CatEmbed], ephemeral: true });
  },
};
