const discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "banco",
  description: "Saiba quanto dinheiro está armazenado na sua carteira!",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
    },
  ],
  category: "economia",
  run: async (interaction, client) => {
    const membro =
    interaction.options.getMember("usuário") || interaction.member;
    let erro = new discord.MessageEmbed()
      .setAuthor({ name: "» Tente Novamente", iconURL: client.warn })
      .setColor(client.cor);
    try {
      const ec = await client.db.Users.findOne({ _id: membro.id });
      const canvas = Canvas.createCanvas(387, 246);
      const context = canvas.getContext("2d");

      var x = 0;
      var y = 0;
      var width = 387;
      var height = 246;
      var radius = 15;

      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
      context.stroke();
      try {
        context.fillStyle = ec.coratm;
      } catch (err) {
        context.fillStyle = "#27AE60";
      }
      context.fill();

      // Chip

      const chip = await Canvas.loadImage("https://i.imgur.com/V8zdbUN.png");
      context.drawImage(chip, 310, 110, 70, 60);

      // Mastercard

      const mc = await Canvas.loadImage("https://i.imgur.com/0Vwz1C2.png");
      context.drawImage(mc, 310, 190, 65, 40);

      // Usuário

      context.font = `22px Impact`;
      context.fillStyle = "#ffffff";
      context.fillText(`Proprietário:`, 10, 200);

      context.font = `28px Impact`;
      context.fillStyle = "#000000";
      context.fillText(`${membro.displayName.substring(0, 19)}`, 10, 230);

      // Dinheiro

      context.font = `22px Impact`;
      context.fillStyle = "#ffffff";
      context.fillText(`Animecoins:`, 10, 130);

      context.font = `28px Impact`;
      context.fillStyle = "#000000";
      context.fillText(`${ec.animecoins.toLocaleString("pt-BR")}`, 10, 160);

      // ID do Cartão

      context.font = `28px Impact`;
      context.fillStyle = "#000000";
      context.fillText(`${membro.id.match(/.{1,4}/g).join(" ")}`, 45, 80);

      // Nome do Banco

      context.font = `43px Impact`;
      context.fillStyle = "#ffffff";
      context.fillText(`Banco Animelândia`, 5, 45);

      context.beginPath();
      context.arc(125, 125, 100, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();

      const attachment = new discord.MessageAttachment(
        canvas.toBuffer(),
        "banco.png"
      );
        await interaction.reply({files: [attachment]});
      if (membro.id === interaction.member.id) {
        if (ec.dinsujo > 0) {
          let botao = new discord.MessageActionRow()
          .addComponents(
          new discord.MessageButton()
            .setLabel("Lavar")
            .setStyle("PRIMARY")
            .setEmoji("💰")
            .setCustomId(`lavar`)
            )
          let lavar = new discord.MessageEmbed()
            .setAuthor({
              name: `» Animecoins sujo: ${ec.dinsujo.toLocaleString("pt-BR")}`,
              iconURL: "https://i.imgur.com/moCnK2F.png",
            })
            .setColor(client.cor);
          interaction.editReply({
            files: [attachment],
            embeds: [lavar],
            components: [botao],
          });
        }
      }

      if (!ec) {
        new client.db.Users({ _id: membro.id }).save();
        return interaction.reply({ embeds: [erro] });
      }
    } catch (err) {
      console.log(err)
      new client.db.Users({ _id: membro.id }).save();
      return interaction.reply({ embeds: [erro] });
    }
  },
};
