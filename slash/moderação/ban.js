const discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-BR')
module.exports = {
  name: 'ban',
  description: 'Bane um usuário!',
  permissions: 'BAN_MEMBERS',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6,
      required: true
    },
    {
      name: 'motivo',
      description: 'Qual o motivo do banimento?',
      type: 3
    }
  ],
  category: 'moderação',
  run: async (interaction, client) => {
    const usuario = interaction.options.getUser('usuário')
    const motivo =
      interaction.options.getString('motivo') ||
      'Bom, nenhum motivo foi fornecido!'
    if (usuario.id === interaction.message.author.id) { return interaction.reply({ content: 'Você não pode se banir!' }) }
    const codigo = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5)
    const reason = `Banido por ${interaction.member.user.tag}, motivo: ${motivo}`
    const guild = client.guilds.cache.get(interaction.guild.id)
    guild.bans.create(usuario.id, { reason, days: 1 })
    interaction.reply({
      content:
        'O usuário ' +
        usuario.user.tag +
        ' levou uma marretada no cu.\n\nAh! Código para adicionar provas: ' +
        codigo
    })
    const banEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: '» Ban | Código: ' + codigo,
        iconURL: 'https://i.imgur.com/7PxeOrT.png',
        url: 'https://animesgamesbot.ml/baninfo/' + codigo
      })
      .setDescription(
        'Usuário Banido: ' +
          usuario +
          '\n\nStaff: ' +
          interaction.member.user.tag
      )
      .setThumbnail(interaction.member.user.displayAvatarURL())
      .setColor(client.cor)

    client.channels.cache
      .get('960582101726552194')
      .send('Novo Banimento: ', banEmbed)

    const docToSave = new client.db.BanInfo({
      _id: codigo,
      motivo: reason,
      data: moment().format('LLL'),
      autor: interaction.member.user.tag,
      banido: usuario
    })
    docToSave.save()
  }
}
