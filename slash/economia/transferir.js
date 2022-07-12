const discord = require('discord.js')

module.exports = {
  name: 'transferir',
  description: 'Transfira animecoins para outro utilizador',
  category: 'economia',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6,
      required: true
    },
    {
      name: 'dinheiro',
      description: 'Quanto dinheiro para a aposta',
      type: 4,
      required: true
    }
  ],
  run: async (interaction, client) => {
    const transferido = interaction.options.getMember('usuário')
    const dinheiro2 = interaction.options.getInteger('dinheiro')
    if (dinheiro2 < 1) {
      return interaction.reply({
        embeds: [
          new discord.MessageEmbed()
            .setAuthor({ name: '» Operação Inválida.', iconURL: client.err })
            .setColor(client.cor)
        ]
      })
    }
    if (transferido.user.bot) {
      return interaction.reply({
        embeds: [
          new discord.MessageEmbed()
            .setAuthor({
              name: '» Bots não podem receber dinheiro.',
              iconURL: client.err
            })
            .setColor(client.cor)
        ]
      })
    }
    if (transferido.id === interaction.member.id) {
      return interaction.reply({
        embeds: [
          new discord.MessageEmbed()
            .setAuthor({ name: '» Aleatoriadades?', iconURL: client.err })
            .setColor(client.cor)
        ]
      })
    }
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        if (doc) {
          if (doc.animecoins < dinheiro2) {
            return interaction.reply({
              embeds: [
                new discord.MessageEmbed()
                  .setAuthor({ name: '» Sem Dinheiro.', iconURL: client.warn })
                  .setColor(client.cor)
              ]
            })
          }
          doc.animecoins -= dinheiro2
          doc.save()
          interaction.reply({
            embeds: [
              new discord.MessageEmbed()
                .setAuthor({
                  name: `» ${interaction.member.user.tag} deu ${dinheiro2} para o ${transferido.user.tag}!`,
                  iconURL: 'https://i.imgur.com/PVt947i.png'
                })
                .setImage('https://i.imgur.com/NKF7rTN.png')
                .setColor(client.cor)
            ]
          })
          if (!doc) {
            new client.db.Users({ _id: interaction.member.id }).save()
            return interaction.reply({
              embeds: [client.msg.embeds.registro]
            })
          }
          client.db.Users.findOne({ _id: transferido.id }, function (err, doc) {
            if (doc) {
              doc.animecoins += dinheiro2
              doc.save()
            }
            if (!doc) {
              const docToSave = new client.db.Users({
                _id: transferido.id,
                animecoins: dinheiro2
              })
              docToSave.save()
              return interaction.reply({
                embeds: [client.msg.embeds.registro]
              })
            }
          })
        }
      }
    )
  }
}
