const discord = require("discord.js");

module.exports = {
  name: "motivos",
  description: "Motivos para namorar com o dono deste servidor!",
  category: "diversão",
  run: async (interaction, client) => {
    const attachment1 = new discord.MessageAttachment(
        "https://i.imgur.com/DDMVN5m.jpeg",
        "1.png"
      );
      const attachment2 = new discord.MessageAttachment(
        "https://i.imgur.com/9BY2V8y.jpeg",
        "2.png"
      );
      const attachment3 = new discord.MessageAttachment(
        "https://i.imgur.com/79uiRfO.jpeg",
        "3.png"
      );
      const attachment4 = new discord.MessageAttachment(   
        "https://i.imgur.com/TUsJZDM.png",
        "4.png"
      );
      interaction.reply({files: [attachment1, attachment2, attachment3, attachment4]});
  },
};
