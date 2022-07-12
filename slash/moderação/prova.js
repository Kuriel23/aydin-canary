const discord = require('discord.js')

module.exports = {
  name: 'prova',
  description: 'Adicione prova ao seu banimento!',
  permissions: 'KICK_MEMBERS',
  options: [
    {
      name: 'código',
      type: 3,
      description: 'Código do banimento',
      required: true
    },
    {
      name: 'imagem',
      description: 'Envie o ficheiro.',
      type: 11,
      required: true
    }
  ],
  category: 'moderação',
  run: async (interaction, client) => {
    const codigo = interaction.options.getString('código')
    const url = interaction.options.getAttachment('imagem').proxyURL

    client.db.BanInfo.findOne({ _id: codigo }, function (err, doc) {
      if (!doc) {
        return interaction.reply({
          embeds: [
            new discord.MessageEmbed()
              .setAuthor({ name: '» Código Inválido!', iconURL: client.warn })
              .setColor(client.cor)
          ]
        })
      }
      if (doc) {
        interaction.reply({
          embeds: [
            new discord.MessageEmbed()
              .setAuthor({ name: '» Provas Adicionadas!', iconURL: client.ok })
              .setColor(client.cor)
          ]
        })
        doc.provas.push(url)
        doc.save()
      }
    })
  }
}
