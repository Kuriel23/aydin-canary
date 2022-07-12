const discord = require('discord.js')

module.exports = {
  name: 'baninfo',
  description: 'Receba informações sobre um banimento!',
  permissions: 'KICK_MEMBERS',
  options: [
    {
      name: 'código',
      type: 3,
      description: 'Código do banimento',
      required: true
    }
  ],
  category: 'moderação',
  run: async (interaction, client) => {
    const codigo = interaction.options.getString('código')
    try {
      const userDB = await client.db.BanInfo.findOne({ _id: codigo })
      const BanInfoEmbed = new discord.MessageEmbed()
        .setAuthor({
          name: `» Código ${codigo} de banimento de: ${userDB.banido}`,
          iconURL: 'https://i.imgur.com/h0NAWyD.png'
        })
        .addField('Autor:', userDB.autor, true)
        .addField('Data:', userDB.data, true)
        .addField('Motivo:', userDB.motivo, true)
        .addField(
          'Provas:',
          userDB.provas.length > 0
            ? userDB.provas.join(' | ')
            : 'Nenhuma prova foi colocada.'
        )
        .setColor(client.cor)
      interaction.reply({ embeds: [BanInfoEmbed] })
    } catch (err) {
      interaction.reply({ embeds: [new discord.MessageEmbed().setAuthor({ name: '» Código Inválido!', iconURL: client.warn }).setColor(client.cor)] })
    }
  }
}
