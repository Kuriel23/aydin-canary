const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "cachorro",
  description: "Veja fotos de cachorros :)",
  category: "diversão",
  run: async (interaction, client) => {
    const { body } = await superagent.get(
      "https://dog.ceo/api/breeds/image/random"
    );
    let DogEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: "» Cachorrinhos são fofinhos!",
        iconURL: "https://i.imgur.com/Y4kApgo.png",
      })
      .setImage(body.message)
      .setColor(client.cor);
    interaction.reply({ embeds: [DogEmbed], ephemeral: true });
  },
};
