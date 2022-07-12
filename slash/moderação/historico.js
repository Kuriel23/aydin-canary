module.exports = {
  name: 'historico',
  description: 'Obtenha um painel sobre as punições aplicadas ao usuário!',
  permissions: 'KICK_MEMBERS',
  options: [
    {
      name: 'usuário',
      description: 'O usuário que você deseja ver o histórico de punições.',
      type: 6,
      required: true
    }
  ],
  category: 'moderação',
  run: async (interaction, client) => {
    const user = interaction.options.getUser('usuário')
    const mentionedDatabase = await client.db.Users.findOne({ _id: user.id })
    if (!mentionedDatabase) { return interaction.reply({ content: 'Nada encontrado.' }) }
    const userMutes = mentionedDatabase.punishments.mutes
    const userAutobot = mentionedDatabase.punishments.autobot

    interaction.reply({
      content:
        '**Histórico de**: ``' +
        user.tag +
        '``\n**Watch Dogs (' +
        userAutobot.length +
        '):** `' +
        (userAutobot.length > 0
          ? userAutobot.join(' | ')
          : 'Nenhuma punição Watch Dogs.') +
        '`\n**Mutes (' +
        userMutes.length +
        '):** `' +
        (userMutes.length > 0 ? userMutes.join(' | ') : 'Nenhum mute.') +
        '`'
    })
  }
}
