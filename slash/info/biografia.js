const discord = require('discord.js')

module.exports = {
  name: 'biografia',
  description: 'Veja informações sobre um anime!',
  options: [
    {
      name: 'texto',
      description: 'O que gostaria de definir?',
      type: 3,
      required: true
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const bio = interaction.options.getString('texto')
    client.db.Users.findOne({ _id: interaction.member.id }, function (err, doc) {
      if (!doc) {
        new client.db.Users({
          _id: interaction.member.id
        }).save()
        return interaction.reply({ embeds: [client.msg.embeds.registro] })
      } else {
        doc.biografia = bio
        doc.save()
        const emb = new discord.MessageEmbed()
          .setAuthor({
            name: "» Defini a sua Biografia com sucesso!",
            iconURL: client.ok,
          })
          .setImage("https://i.imgur.com/BONwNfg.png")
          .setColor(client.cor);
        interaction.reply({ embeds: [emb] })
      }
    })
  }
}
