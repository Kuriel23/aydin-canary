const discord = require("discord.js");
const Canvas = require("canvas");
const ms = require("parse-ms-2");
const schedule = require('node-schedule');

module.exports = {
  name: "rep",
  description: "Alguém te ajudou? Então dê reputação a ele!",
  options: [
    {
      name: "usuário",
      description: "Qual usuário?",
      type: 6,
      required: true,
    },
  ],
  category: "economia",
  run: async (interaction, client) => {
    const repUser = interaction.options.getMember("usuário");

    await interaction.reply({ content: "Em busca de contéudo..." });
    if (repUser.bot) {
      let bot = new discord.MessageEmbed()
        .setAuthor({
          name: `» Bots não podem receber reputações.`,
          iconURL: client.err,
        })
        .setColor(client.cor);
      return interaction.editReply({ content: null, embeds: [bot] });
    }
    if (repUser.id === interaction.member.id) {
      let autorep = new discord.MessageEmbed()
        .setAuthor({
          name: `» Você não se pode auto reputar.`,
          iconURL: client.err,
        })
        .setColor(client.cor);
      return interaction.editReply({ content: null, embeds: [autorep] });
    }
    const background = await Canvas.loadImage(
      "https://i.imgur.com/c9ZU4oK.png"
    );
    const avatar = await Canvas.loadImage(
      interaction.member.user.displayAvatarURL({ format: "jpg" })
    );
    const repavatar = await Canvas.loadImage(
      repUser.user.displayAvatarURL({ format: "jpg" })
    );
    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        if (!doc) {
          new client.db.Users({ _id: interaction.member.id }).save();
          let dbnew = new discord.MessageEmbed()
            .setAuthor({ name: `» Tente Novamente.`, iconURL: client.err })
            .setColor(client.cor);
          return interaction.editReply({ content: null, embeds: [dbnew] });
        }

        const delayTime = 7200000;
        const _time = ms(delayTime - (Date.now() - doc.repCooldown));
        if (delayTime - (Date.now() - doc.repCooldown) > 0) {
          let cooldown = new discord.MessageEmbed()
            .setAuthor({
              name: `» Espere: ${_time.hours}h, ${_time.minutes}m e ${_time.seconds}s para dar outra reputação.`,
              iconURL: client.warn,
            })
            .setColor(client.cor);
          return interaction.editReply({ content: null, embeds: [cooldown] });
        } else {
          doc.repCooldown = Date.now();
          doc.save();
        }
        client.db.Users.findOne({ _id: repUser.id }, function (err, doc2) {
          if (!doc2) {
            new client.db.Users({ _id: repUser.id }).save();
            let dbnew = new discord.MessageEmbed()
              .setAuthor({ name: `» Tente Novamente.`, iconURL: client.err })
              .setColor(client.cor);
            return interaction.editReply({ content: null, embeds: [dbnew] });
          }
          if (doc2) {
            doc2.rep += 1;
            doc2.save();
            const canvas = Canvas.createCanvas(934, 282);
            const context = canvas.getContext("2d");
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            context.font = `25px sans-serif`;
            context.fillStyle = "#ffffff";
            context.fillText(
              `${repUser.user.tag} recebeu 1 reputação de ${interaction.member.user.tag}`,
              30,
              50
            );

            context.drawImage(avatar, 30, 60, 160, 160);

            context.drawImage(repavatar, 730, 60, 160, 160);

            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();

            const attachment = new discord.MessageAttachment(
              canvas.toBuffer(),
              "rep.png"
            );
            interaction.editReply({ content: null, files: [attachment] });
          }
          if (doc.config.notificarep === true) {
            client.db.Guilds.findOne(
              { _id: "531574473644703744" },
              function (err, not) {
                const _date = new Date();
                _date.setHours(_date.getHours() + 2);
                const date = new Date(_date);
                not.repschedule.push({
                  _id: interaction.member.id,
                  schedule: date,
                });
                not.save();

                schedule.scheduleJob(date, function () {
                  const webhookClient = new discord.WebhookClient({
                    url: "https://discord.com/api/webhooks/972829188421738516/z3cd69zBbUZ0be0t3soB_9MjRdR2wo_KsfZswdsRCRts-BdAUm8ZsN2cMzZIfLwuhlQk",
                  });
                  webhookClient.send({
                    content: `**[ATUALIZAÇÃO]** | Você pode dar uma nova reputação. ||<@${interaction.member.id}>||`,
                    username: "Mestre das Reputação",
                    avatarURL: "https://i.imgur.com/06Ahjgz.jpeg",
                  });
                  not.repschedule.pull({ _id: interaction.member.id });
                  not.save();
                });
              }
            );
          }
        });
      }
    );
  },
};
