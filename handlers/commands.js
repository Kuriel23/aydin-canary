const fs = require('fs')

module.exports = (client) => {
  const folders = fs.readdirSync('./commands/')

  folders.forEach((dir) => {
    const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`)
      if (command.name) {
        client.commands.set(command.name, command)
        client.logger.log(
                  `> ➕ • Comando ${command.name} foi carregado.`,
                  'cmd'
        )
      } else {
        client.logger.log(`${file} - ❌  -> falta help.name, ou help.name não é uma string.`, 'warn')
        continue
      }
    }
  })
  client.logger.log('> ✅ • Carregado com sucesso [COMANDO]', 'success')
}
