const discord = require('discord.js')

module.exports = {
  name: 'report',
  description: 'Denuncie uma pessoa!',
  options: [
    {
      name: 'usuário',
      description: 'Qual usuário?',
      type: 6,
      required: true
    },
    {
      name: 'motivo',
      description: 'Qual motivo?',
      type: 3,
      required: true
    },
    {
      name: 'provas',
      description: 'Envie provas',
      type: 11
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const member = interaction.options.getMember('usuário')
    const ReportMessage = interaction.options.getString('motivo')
    const messageHadAttachment =
      interaction.options.getAttachment('provas') || null
    if (member.user.id === interaction.member.id) {
      return interaction.reply({
        embeds: [
          new discord.MessageEmbed()
            .setAuthor({
              name: '» Você não pode se reportar!',
              iconURL: client.err
            })
            .setColor(client.cor)
        ]
      })
    }
    const ReportEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: `Reporte de ${interaction.member.user.tag} (ID: ${interaction.member.id})`,
        iconURL: 'https://i.imgur.com/btYoCTT.png'
      })
      .setDescription(
        `Reportado: ${member} ID: ${member.user.id}\n${ReportMessage}`
      )
      .setColor(client.cor)
    if (messageHadAttachment !== null) { ReportEmbed.setImage(messageHadAttachment.proxyURL) }
    const button = new discord.MessageButton()
      .setLabel('Banir Membro')
      .setStyle('SUCCESS')
      .setEmoji('852929896799273000')
      .setCustomId('report' + interaction.member.id)
    const anular = new discord.MessageButton()
      .setLabel('Fake')
      .setStyle('DANGER')
      .setEmoji('❌')
      .setCustomId('anulareport' + interaction.member.id)
    const row = new discord.MessageActionRow().addComponents(button, anular)
    interaction.reply({ content: 'Reporte enviado.', ephemeral: true })
    const mensagem = await client.channels.cache
      .get('994673812132069386')
      .send({ content: '@here', embeds: [ReportEmbed], components: [row] })
    const collector = mensagem.createMessageComponentCollector({
      componentType: 'BUTTON',
      max: 1
    })
    collector.on('collect', (button) => {
      if (button.customId === 'report' + interaction.member.id) {
        member.ban({ reason: ReportMessage })
        button.reply(
          `Reporte resolvido com sucesso, banimento executado por <@${button.user.id}>`,
          false
        )
        client.channels.cache
          .get('675087693474168864')
          .send(
            `Oiii <@${interaction.member.id}>!\nVocê está recebendo esta mensagem para avisar que nossa equipe revisou seu reporte e o mesmo foi penalizado e marcado como resolvido.\n\nFaça igual a ${interaction.member.user.tag} e reporte para manter nossa comunidade saudável e segura!`
          )
      }
      if (button.customId === 'anulareport' + interaction.member.id) {
        button.reply(
          `Reporte resolvido sem punição, anulado por <@${button.user.id}>`,
          false
        )
        client.channels.cache
          .get('675087693474168864')
          .send(
            `Olá <@${interaction.member.id}>!\nVocê está recebendo esta mensagem para avisar que nossa equipe revisou seu reporte e o mesmo foi marcado como rejeitado.\n\nRevise seu reporte caso não tenha dentro destes critérios:\n1. Não se trata de uma regra válida\n2. Falta de Provas, para isso reporte novamente e anexe-as junta á mensagem.\n3. A Nossa Equipe não controla coisas que ocorrem dentro da sua DM, excepto para divulgação ou scam\n\nCuidado para não tomar uma punição caso você faça reportes recorrentes falsos.`
          )
      }
    })
  }
}
