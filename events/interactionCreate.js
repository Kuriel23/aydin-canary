const { MessageEmbed } = require('discord.js');

module.exports = async(client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
		if (!client.slash.has(interaction.commandName)) return;
		if (!interaction.guild) return;
		const command = client.slash.get(interaction.commandName)
		try {
			if (command.permissions) {
				if (!interaction.member.permissions.has(command.permissions)) {
					const embed = new MessageEmbed()
					.setTitle('Falta de permissão')
					.setDescription(`:x: Você precisa de \`${command.permissions}\` para usar este comando`)
					.setColor(client.cor)
					.setTimestamp()
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.devs) {
				if ("354233941550694400" === interaction.user.id) {
					return interaction.reply({ content: "Nananinanão! Apenas desenvolvedores podem acessar isto!", ephemeral: true });
				}
			}
			command.run(interaction, client);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Ocorreu um estranho erro no meu terminal para este comando...', ephemeral: true });
		}
	}
} 