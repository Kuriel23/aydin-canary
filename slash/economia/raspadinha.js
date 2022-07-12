const discord = require('discord.js')

module.exports = {
  name: 'raspadinha',
  description: 'Raspe e tente sua sorte para ganhar algumas animecoins.',
  category: 'economia',
  run: async (interaction, client) => {
    client.db.Users.findOne({ _id: interaction.member.id }, function (err, doc) {
      if (doc) {
        if (doc.animecoins < 100) {
          const nomoney = new discord.MessageEmbed()
            .setAuthor({
              name: '» Sem Dinheiro para jogar na Raspadinha.',
              iconURL: client.warn
            })
            .setColor(client.cor)
          return interaction.reply({ embeds: [nomoney], ephemeral: true })
        }
        const respostas = [100, 500, 25, 600, 1000, 50, 200, 150, 750]
        const resultado = Math.floor(Math.random() * respostas.length)
        const RaspadaEmbed = new discord.MessageEmbed()
          .setTitle('<:pikachupensando:846137799631437854> » Raspadinha')
          .setDescription(
            'A raspadinha deu o lucro de: ||' + respostas[resultado] + '||'
          )
          .setColor(client.cor)
          .setTimestamp()
        interaction.reply({ embeds: [RaspadaEmbed], ephemeral: true })
        const dinheiroadar = respostas[resultado]
        doc.animecoins -= 100
        doc.animecoins += dinheiroadar
        doc.save()
      } else {
        new client.db.Users({ _id: interaction.member.id }).save()
        return interaction.reply({ embeds: [client.msg.embeds.registro] })
      }
    })
  }
}
