module.exports = {
  name: 'lock',
  description: 'Bloqueie o chat!',
  permissions: 'MANAGE_MESSAGES',
  category: 'moderação',
  run: async (interaction, client) => {
    interaction.channel.updateOverwrite(
      interaction.channel.guild.roles.everyone,
      { SEND_MESSAGES: false }
    )
    interaction.reply({ content: 'Chat bloqueado com sucesso!' })
    client.channels.cache
      .get('960575934736502814')
      .send(
        `${interaction.member.user.tag} usou lock no canal <#${interaction.channel.id}>`
      )
  }
}
