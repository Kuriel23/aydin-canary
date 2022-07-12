const discord = require('discord.js')

module.exports = {
  name: 'definircor',
  description: 'Defina a cor do seu perfil. | Exclusivo Newsletter',
  options: [
    {
      name: 'tipo',
      description: 'Em que comando?',
      type: 3,
      required: true,
      choices: [
        {
          name: 'Banco',
          value: 'banco'
        },
        {
          name: 'Perfil',
          value: 'perfil'
        }
      ]
    },
    {
      name: 'hex',
      description: 'Qual hex?',
      type: 3,
      required: true
    }
  ],
  category: 'economia',
  run: async (interaction, client) => {
    const type = interaction.options.getString('tipo')
    const hex = interaction.options.get('hex').value
    if (
      !interaction.member.roles.cache.find((r) =>
        ['654435562295656478', '907026665086005308'].includes(r.id)
      )
    ) {
      const perm = new discord.MessageEmbed()
        .setAuthor({
          name: '» Você deverá ter privelégios booster ou newsletter para usar este comando.',
          iconURL: client.err
        })
        .setColor(client.cor)
      return interaction.reply({ embeds: [perm] })
    }

    const comousar = new discord.MessageEmbed()
      .setAuthor({
        name: '» Definir Cor',
        iconURL: 'https://i.imgur.com/rSeaiDW.png'
      })
      .setDescription(
        'Este comando oferece a possibilidade da pessoa definir a cor á sua escolha em seu perfil ou banco.\n\nVocê pode usar a ferramenta: [Cor Hexa](https://corhexa.com/seletor-de-cores) para escolher a sua cor que mais se adequar.'
      )
      .setImage('https://i.imgur.com/ljBC1Kz.png')
      .setColor(client.cor)

    if (!hex.startsWith('#')) { return interaction.reply({ embeds: [comousar] }) }
    if (!isHexColor(hex.replace('#', '')) === true) { return interaction.reply({ embeds: [comousar] }) }

    if (type === 'perfil') {
      const definido = new discord.MessageEmbed()
        .setAuthor({
          name: `» Você definiu sua cor para ${hex}.`,
          iconURL: client.ok
        })
        .setColor(hex)

      client.db.Users.findOne({ _id: interaction.member.id }, function (err, doc) {
        if (doc) {
          doc.cor = hex
          doc.save()
          return interaction.reply({ embeds: [definido] })
        } else {
          new client.db.Users({ _id: interaction.member.id, cor: hex }).save()
          return interaction.reply({ embeds: [definido] })
        }
      })
    }
    if (type === 'banco') {
      const definido = new discord.MessageEmbed()
        .setAuthor({
          name: `» Você definiu sua cor do banco para ${hex}.`,
          iconURL: client.ok
        })
        .setColor(hex)

      client.db.Users.findOne({ _id: interaction.member.id }, function (err, doc) {
        if (doc) {
          doc.coratm = hex
          doc.save()
          return interaction.reply({ embeds: [definido] })
        } else {
          new client.db.Users({ _id: interaction.member.id, coratm: hex }).save()
          return interaction.reply({ embeds: [definido] })
        }
      })
    }

    function isHexColor (hex) {
      return (
        typeof hex === 'string' &&
        hex.length === 6 &&
        !isNaN(Number('0x' + hex))
      )
    }
  }
}
