const { MessageEmbed } = require('discord.js')

module.exports = async (client, interaction) => {
  if (interaction.isCommand() || interaction.isContextMenu()) {
    if (!client.slash.has(interaction.commandName)) return
    if (!interaction.guild) return;
        const doc = await client.db.Guilds.findOne({
          _id: "531574473644703744",
        });
    if (doc.manutencao === true) {
      if (interaction.member.id !== '354233941550694400') {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: '» Manutenção está ativa, tente novamente mais tarde.',
                iconURL: 'https://i.imgur.com/iTPGuDR.png'
              })
              .setColor(client.cor)
          ]
        })
      }
    }
    const command = client.slash.get(interaction.commandName)
    try {
      if (command.permissions) {
        if (!interaction.member.permissions.has(command.permissions)) {
          const embed = new MessageEmbed()
            .setTitle('Falta de permissão')
            .setDescription(
              `:x: Você precisa de \`${command.permissions}\` para usar este comando`
            )
            .setColor(client.cor)
            .setTimestamp()
          return interaction.reply({ embeds: [embed], ephemeral: true })
        }
      }
      if (command.devs) {
        if (interaction.user.id === '354233941550694400') {
          return interaction.reply({
            content: 'Nananinanão! Apenas desenvolvedores podem acessar isto!',
            ephemeral: true
          })
        }
      }
      command.run(interaction, client)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content:
          'Ocorreu um estranho erro no meu terminal para este comando...',
        ephemeral: true
      })
    }
  }
  if (interaction.isButton()) {
    const path = '../events/interaction/buttons/'
    if (interaction.customId === 'lavar') { require(path + 'lavar')(client, interaction) }
    // Registro
    if (interaction.customId === 'homem') {
      const role = interaction.guild.roles.cache.get('840717120932675614')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'mulher') {
      const role = interaction.guild.roles.cache.get('840716936014725151')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'binario') {
      const role = interaction.guild.roles.cache.get('840717160774500384')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'mais18') {
      const role = interaction.guild.roles.cache.get('840717202038849586')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'menos18') {
      const role = interaction.guild.roles.cache.get('840717245314891786')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'hetero') {
      const role = interaction.guild.roles.cache.get('840717282946842625')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'lgbt') {
      const role = interaction.guild.roles.cache.get('840717362519998475')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'lancamentos') {
      const role = interaction.guild.roles.cache.get('840707996220129290')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'lancamentosh') {
      const role = interaction.guild.roles.cache.get('944999640795861012')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'noticias') {
      const role = interaction.guild.roles.cache.get('842501545257730059')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'eventos') {
      const role = interaction.guild.roles.cache.get('840990675495550977')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    // Cores
    if (interaction.customId === 'roxo') {
      const role = interaction.guild.roles.cache.get('840723322764394537')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'rosachoque') {
      const role = interaction.guild.roles.cache.get('840723416931106856')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'vermelho') {
      const role = interaction.guild.roles.cache.get('840723494144835588')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'preto') {
      const role = interaction.guild.roles.cache.get('840723569088266270')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'azul') {
      const role = interaction.guild.roles.cache.get('840723611110473749')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'ciano') {
      const role = interaction.guild.roles.cache.get('840723858994626601')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'amarelo') {
      const role = interaction.guild.roles.cache.get('840723801862963221')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'verde') {
      const role = interaction.guild.roles.cache.get('840723709525360700')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'carmesim') {
      const role = interaction.guild.roles.cache.get('840723938320318494')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'laranja') {
      const role = interaction.guild.roles.cache.get('840724324147396629')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'verdefosco') {
      const role = interaction.guild.roles.cache.get('840724452605820969')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'azulfosco') {
      const role = interaction.guild.roles.cache.get('840724720596680704')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'magenta') {
      const role = interaction.guild.roles.cache.get('840724928776634429')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
    if (interaction.customId === 'branco') {
      const role = interaction.guild.roles.cache.get('840724965308760135')
      const member = interaction.user
      let msg = ''
      if (member.roles.cache.has(role.id)) {
        msg = 'Remover cargo'
        member.roles.remove(role)
      } else {
        msg = 'Adicionar cargo'
        member.roles.add(role)
      }
      interaction.reply(
        {
          content: 'Operação "' + msg + '" realizada com sucesso.',
          ephemeral: true
        }
      )
    }
  };
}
