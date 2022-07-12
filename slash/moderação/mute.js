const discord = require('discord.js')
const ms = require('ms-pt-br')

module.exports = {
  name: 'mute',
  description: 'Silencie um usuário.',
  permissions: 'MODERATE_MEMBERS',
  options: [
    {
      name: 'usuário',
      type: 6,
      description: 'Qual usuário?',
      required: true
    },
    {
      name: 'tempo',
      type: 3,
      description: 'Qual o tempo?',
      required: true
    },
    {
      name: 'motivo',
      type: 3,
      description: 'Qual o motivo?'
    }
  ],
  category: 'moderação',
  run: async (interaction, client) => {
    const member = interaction.options.getMember('usuário')
    const reason =
      interaction.options.getString('motivo') +
        ' - Punido por: ' +
        interaction.member.user.tag ||
      'Punido por: ' + interaction.member.user.tag
    const time = ms(interaction.options.getString('tempo'))

    if (!time) {
      return interaction.reply({
        content:
          'O tempo que foi dado não é válido. Você deve usar d para dias, h para horas e m para minutos.'
      })
    }
    await member.timeout(time, reason).catch((error) => {
      return interaction.reply({
        content: 'É impossível realizar tal ação contra este usuário.'
      })
    })
    const muteEmbed = new discord.MessageEmbed()
      .setAuthor({ name: '» Mute', iconURL: 'https://i.imgur.com/5aFeS1u.png' })
      .setDescription(
              `Usuário: <@${member.id}>\nID: ${member.id}\nStaff: <@${interaction.member.id}>\nMotivo: ${reason}`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(client.cor)

    client.channels.cache
      .get('960582101726552194')
      .send('Novo silenciamento:', muteEmbed)
    client.db.Users.findOne({ _id: member.id }, function (err, doc) {
      if (doc) {
        doc.punishments.mutes.push(reason)
        doc.save()
      }
      if (!doc) {
        const docToSave = new client.db.Users({
          _id: member.id,
          punishments: { mutes: [reason] }
        })
        docToSave.save()
      }
    })
    return interaction.reply({
      content: `${member} foi mutado por ${ms(time, { long: true })}`
    })
  }
}
