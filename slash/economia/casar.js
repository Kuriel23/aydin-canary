const discord = require('discord.js')

module.exports = {
  name: 'casar',
  description:
    'Uh, parece que vamos ver um novo casal por aqui! Olha só como o amor é tão lindo!',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6,
      required: true
    }
  ],
  category: 'economia',
  run: async (interaction, client) => {
    const repUser = interaction.options.getMember('usuário')
    await interaction.reply({ content: 'Pesquisando contéudo...' })
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        const bot = new discord.MessageEmbed()
          .setAuthor({
            name: '» Bots não podem aceitar ou rejeitar casamentos',
            iconURL: client.err
          })
          .setColor(client.cor)
        if (repUser.bot) {
          return interaction.editReply({ content: null, embeds: [bot] })
        }

        const autocasar = new discord.MessageEmbed()
          .setAuthor({
            name: '» Você não pode se auto casar',
            iconURL: client.err
          })
          .setColor(client.cor)
        if (repUser.id == interaction.member.id) {
          return interaction.editReply({ content: null, embeds: [autocasar] })
        }

        const AjudaPrincipal = new discord.MessageEmbed()
          .setAuthor({
            name: '» Pedido de Casamento',
            iconURL: 'https://i.imgur.com/cIujboH.png'
          })
          .setDescription(
            interaction.member.user.tag +
              ' e <@' +
              repUser +
              '>, vocês já foram muitas coisas um do outro, amigos, companheiros, namorados, noivos. Agora, com as palavras que vocês estão prestes a trocar, vocês passarão para a próxima fase.\n\nPois, com estes votos, vocês estarão dizendo ao mundo: “este é meu esposo”, “esta é minha esposa”.\n\n<@' +
              repUser +
              '>, é de livre e espontânea vontade que você aceita a ' +
              interaction.member.user.tag +
              ' como seu(sua) companheiro(a) em matrimônio?'
          )
          .setColor(client.cor)
          .setImage('https://i.imgur.com/UrVwk1z.png')
        const botao = new discord.MessageActionRow().addComponents(
          new discord.MessageButton()
            .setStyle('PRIMARY')
            .setEmoji('✅')
            .setCustomId('primary')
        )
        interaction.editReply({
          content: null,
          embeds: [AjudaPrincipal],
          components: [botao]
        })
        const filter = (i) =>
          i.customId === 'primary' && i.user.id === repUser.id

        const collector = interaction.channel.createMessageComponentCollector({
          filter,
          time: 60000,
          max: 1
        })

        collector.on('collect', async (i) => {
          if (doc) {
            doc.casado = '<@' + repUser.id + '>'
            doc.save()
          }
          if (!doc) {
            new client.db.Users({
              _id: interaction.member.id,
              casado: '<@' + repUser.id + '>'
            }).save()
          }
          const aceite = new discord.MessageEmbed()
            .setAuthor({
              name:
                '» ' +
                interaction.member.user.tag +
                ' casou com ' +
                repUser.user.tag,
              iconURL: 'https://i.imgur.com/Guntqo0.png'
            })
            .setColor(client.cor)
          i.reply({ embeds: [aceite] })
          client.db.Users.findOne(
            { _id: repUser.id },
            function (err, docesposa) {
              if (docesposa) {
                docesposa.casado = '<@' + interaction.member.id + '>'
                docesposa.save()
              }
              if (!docesposa) {
                new client.db.Users({
                  _id: repUser.id,
                  casado: '<@' + interaction.member.id + '>'
                }).save()
              }
            }
          )
        })

        collector.on('end', (collected) => 0)
      }
    )
  }
}
