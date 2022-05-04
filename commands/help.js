const discord = require("discord.js");

module.exports = {
  name: "helpmeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  aliases: [],
  description: "Comando para auxilio de outros comandos.",
  category: "Diversos",
  run: async (client, message, args) => {
    let botao = new discord.MessageActionRow()
      .addComponents(
        new discord.MessageButton()
          .setCustomId("moderacao")
          .setEmoji("👮‍♂️")
          .setLabel("Moderação")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new discord.MessageButton()
          .setCustomId("diversao")
          .setEmoji("🎡")
          .setLabel("Diversão")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new discord.MessageButton()
          .setCustomId("diversos")
          .setEmoji("🌈")
          .setLabel("Diversos")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new discord.MessageButton()
          .setCustomId("economia")
          .setEmoji("🏦")
          .setLabel("Economia")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new discord.MessageButton()
          .setCustomId("musica")
          .setEmoji("🎵")
          .setLabel("Música")
          .setStyle("SECONDARY")
      );
    let embed = new discord.MessageEmbed()
      .setColor(client.cor)
      .setTimestamp(new Date())
      .setTitle(`Ajuda | Resenha`)
      .setDescription(
        `Clique nas categorias abaixo para ver as informações de todos os comandos nessa categoria.`
      );
    message.reply({ embeds: [embed], components: [botao] })
  },
};
