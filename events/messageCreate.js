const discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return 0;

  let prefix = "a?"

  if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmda = args.shift().toLowerCase();
  let command = client.commands.get(cmda) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmda));
  if (!command) return;

  try {
      command.run(client, message, args)
  } catch (error) {
      message.reply({ content: `Houve um erro ao executar esse comando!` });
  }
};
