const discord = require('discord.js')

module.exports = {
  name: 'config',
  description: 'Configure as suas configurações do bot!',
  options: [
    {
      name: 'função',
      description: 'Qual função?',
      type: 3,
      choices: [
        {
          name: 'Notificar Rep',
          value: 'rep'
        },
        {
          name: 'Notificar Trabalhar',
          value: 'trabalhar'
        },
        {
          name: 'Notificar Daily',
          value: 'daily'
        },
        {
          name: 'Notificar Crime',
          value: 'crime'
        },
        {
          name: 'Notificar Roubar',
          value: 'roubar'
        }
      ]
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const função = interaction.options.getString('função') || null
    client.db.Users.findOne(
      { _id: interaction.member.id },
      async function (err, doc) {
        if (doc) {
          function Embed (funcao = '', state = true) {
            const embed = new discord.MessageEmbed()
              .setAuthor({
                name: `${funcao} ${state === true ? 'Ativado' : 'Desativado'}`,
                iconURL:
                  state === true
                    ? 'https://i.imgur.com/0K4tmUd.png'
                    : 'https://i.imgur.com/0K4tmUd.png'
              })
              .setColor(client.cor)
            return interaction.reply({ embeds: [embed] })
          }
          if (função !== null) {
            if (função === 'rep') {
              const estado = doc.config.notificarep !== true
              doc.config.notificarep = estado
              doc.save()
              Embed('Notificar Rep', estado)
            } else if (função === 'trabalhar') {
              const estado = doc.config.notificarwork !== true
              doc.config.notificarwork = estado
              doc.save()
              Embed('Notificar Trabalhar', estado)
            } else if (função === 'daily') {
              const estado = doc.config.notificardaily !== true
              doc.config.notificardaily = estado
              doc.save()
              Embed('Notificar Daily', estado)
            } else if (função === 'crime') {
              const estado = doc.config.notificarcrime !== true
              doc.config.notificarcrime = estado
              doc.save()
              Embed('Notificar Crime', estado)
            } else if (função === 'roubar') {
              const estado = doc.config.notificarob !== true
              doc.config.notificarob = estado
              doc.save()
              Embed('Notificar Roubar', estado)
            }
          } else {
            const ConfigEmbed = new discord.MessageEmbed()
              .setAuthor({
                name: "» Configurações de Seu Perfil",
                iconURL: "https://i.imgur.com/xWD9Mpk.png",
              })
              .addField(
                "» Notificar Rep:",
                doc.config.notificarep === true ? "Ativado" : "Desativado",
                true
              )
              .addField(
                "» Notificar Daily:",
                doc.config.notificardaily === true ? "Ativado" : "Desativado",
                true
              )
              .addField(
                "» Notificar Trabalhar:",
                doc.config.notificarwork === true ? "Ativado" : "Desativado",
                true
              )
              .addField(
                "» Notificar Roubar:",
                doc.config.notificarob === true ? "Ativado" : "Desativado",
                true
              )
              .addField(
                "» Notificar Crime:",
                doc.config.notificarcrime === true ? "Ativado" : "Desativado",
                true
              )
              .setImage("https://i.imgur.com/7Ilb5yJ.png")
              .setColor(client.cor);
            interaction.reply({ content: null, embeds: [ConfigEmbed] })
          }
        }
        if (!doc) {
          new client.db.Users({ _id: interaction.member.id }).save()
          return interaction.reply({ embeds: [client.msg.embeds.registro] })
        }
      }
    )
  }
}
