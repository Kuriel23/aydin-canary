module.exports = {
  name: 'clear',
  description: 'Limpe algumas mensagens do chat.',
  permissions: 'MANAGE_MESSAGES',
  options: [
    {
      name: 'número',
      type: 4,
      description: 'Qual número?',
      required: true
    }
  ],
  category: 'moderação',
  run: async (interaction, client) => {
    const clean = interaction.options.getInteger('número')
    if (clean < 2) return interaction.reply({ content: 'Só posso limpar a partir de 2 mensagens.' })
    interaction.channel.bulkDelete(clean, true).then(() => {
      client.channels.cache
        .get('960575934736502814')
        .send(`Apaguei ${clean} mensagens pelo ${interaction.member.user.tag}`)
      interaction.reply({ content: 'Limpei as mensagens.', ephemeral: true })
    })
  }
}
