const discord = require('discord.js')

module.exports = {
  name: 'botinfo',
  description: 'Veja informações sobre o bot!',
  category: 'info',
  run: async (interaction, client) => {
    return interaction.reply({
      embeds: [
        new discord.MessageEmbed()
          .setAuthor({
            name: "» Botinfo",
            iconURL: "https://i.imgur.com/wRtdcZs.png",
          })
          .addField("📦 Versão:", "v3", true)
          .addField("📖 Linguagem:", "Javascript", true)
          .addField("📚 Biblioteca:", "Discord.JS ", true)
          .addField("<:tocomteso:824136824112545874> Gênero:", "Traveco", true)
          .addField(
            "<:db:960637784530489404> Banco de dados:",
            "Mongoose",
            true
          )
          .addField(
            "<:code:960638489903378432> Desenvolvido em:",
            "<t:1593105360:f>",
            true
          )
          .setColor(client.cor)
          .setImage("https://i.imgur.com/WY1dhEs.png"),
      ],
    });
  }
}
