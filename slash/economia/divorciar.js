const discord = require('discord.js')

module.exports = {
  name: 'divorciar',
  description:
		'Pera, vossa relação acabou??',
  category: 'economia',
  run: async (interaction, client) => {
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        if (doc) {
          client.db.Users.findOne(
            { _id: doc.casado[0].replace(/[<@!?>]/g, '') },
            function (err, docasado) {
              docasado.casado = 'Solteiro'
              docasado.save()
              doc.casado = 'Solteiro'
              doc.save()
              const embed = new discord.MessageEmbed()
                .setDescription('Uma separação pode machucar bastante. É difícil dizer adeus aos planos que foram traçados juntos ou ao futuro que se tinha imaginado. Mas dê um passo de cada vez e as coisas podem melhorar. Redescubra o prazer de estar sozinha, explore novas faces suas, aproveite a vida intensamente. A princípio, de fato, o divórcio machuca, mas pode trazer muita coisa boa.')
                .setImage('https://i.imgur.com/U51PX2O.png')
                .setColor(client.cor)
              return interaction.reply({ embeds: [embed] })
            })
        } else {
          new client.db.Users({ _id: interaction.member.id }).save()
          return interaction.reply({ content: 'Você não está casado.' })
        }
      })
  }
}
