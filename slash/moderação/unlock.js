module.exports = {
  name: 'unlock',
  description: 'Desbloqueie o chat!',
  permissions: 'MANAGE_MESSAGES',
  category: 'moderação',
  run: async (interaction, client) => {
    interaction.channel.updateOverwrite(
      interaction.channel.guild.roles.everyone,
      { SEND_MESSAGES: true }
    )
    interaction.reply({ content: 'Chat desbloqueado com sucesso!' })
    client.channels.cache
      .get('960575934736502814')
      .send(
        `${interaction.member.user.tag} usou unlock no canal <#${interaction.channel.id}>`
      )
  }
}
