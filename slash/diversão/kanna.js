const discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "kanna",
  description: "Projetos, Imagens, entre outros sobre a Kanna!",
  category: "diversão",
  run: async (interaction, client) => {
    const { body } = await superagent.get(
        `https://nekobot.xyz/api/image?type=kanna`
      );
      const attachment = new discord.MessageAttachment(body.message, "kanna.png");
    interaction.reply({ files: [attachment], ephemeral: true });
  },
};
