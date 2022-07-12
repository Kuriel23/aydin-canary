module.exports = async (client) => {
  client.user.setActivity('Envie DM para suporte', {
    type: 'WATCHING'
  })
  const activities = [
    'Prefixo: /',
    'animesonlinegames.com',
    'animesorionvip.com',
    'myanimelist.vip',
    'superhentaisvip.net',
    'goyabu.vip',
    'www.animesgamesbot.ml',
    'Envie DM para suporte'
  ]
  let i = 0
  setInterval(() => {
    client.user.setActivity(activities[i++ % activities.length], {
      type: 'WATCHING'
    })
  }, 15000)
  client.logger.log('> ✅ • Carregado com sucesso [DISCORD]', 'success')
}
