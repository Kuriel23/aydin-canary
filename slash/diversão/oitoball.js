const discord = require("discord.js");

module.exports = {
  name: "oitoball",
  description: "Faça-me perguntas que eu lhe respondo",
  options: [
    {
      name: "pergunta",
      description: "Faça a sua pergunta para responder",
      type: 3,
      required: true,
    },
  ],
  categoria: "diversão",
  run: async (interaction, client) => {
    if (
      interaction.options.get("pergunta").value.includes("suicídio") ||
      interaction.options.get("pergunta").value.includes("suicidio") ||
      interaction.options.get("pergunta").value.includes("Suicídio") ||
      interaction.options.get("pergunta").value.includes("Suicidio") ||
      interaction.options.get("pergunta").value.includes("tirar a vida") ||
      interaction.options.get("pergunta").value.includes("perder a vida") ||
      interaction.options.get("pergunta").value.includes("Perder a vida") ||
      interaction.options.get("pergunta").value.includes("Tirar a vida") ||
      interaction.options.get("pergunta").value.includes("suicidar") ||
      interaction.options.get("pergunta").value.includes("Suicidar") ||
      interaction.options.get("pergunta").value.includes("matar") ||
      interaction.options.get("pergunta").value.includes("Matar")
    )
      return interaction.reply({
        content:
          "Não faça essa ação! Se você pensa sobre tais atos contacte uma psicológa urgentemente para lhe consultar o mais rápido possível e recomendar alguns medicamentos, conselhos e entre outros!",
        ephemeral: true,
      });
    let respostas = [
      "Todos os sinais apontam que sim...",
      "Desculpa, mas não.",
      "Pode ter certeza!",
      "Tá zuando, né? COM CERTEZA Não, cara, não...",
      "Claro que sim!",
      "Muito provavelmente Acho que sim...",
      "Não me enche, cara!",
      "Sim, meu amor, claro que sim!",
      "Me deixa em paz...",
    ];

    let resultado = Math.floor(Math.random() * respostas.length);
    let emb = new discord.MessageEmbed()
      .setAuthor({
        name: `» ${respostas[resultado]}`,
        iconURL: "https://i.imgur.com/Cnxa2re.png",
      })
      .setImage("https://i.imgur.com/gKcIhiC.png")
      .setColor(client.cor);
    interaction.reply({ embeds: [emb] });
  },
};
