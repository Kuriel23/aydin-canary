const discord = require("discord.js");
const ms = require("parse-ms-2");
const schedule = require('node-schedule');

module.exports = {
  name: "trabalhar",
  description: "Trabalhe para comprar novas coisas! | Cooldown: 8 horas",
  category: "economia",
  run: async (interaction, client) => {
    client.db.Users.findOne({ _id: interaction.member.id }, function (err, doc) {
      let salario = Math.floor(Math.random() * (3000 - 1212)) + 1212;
      if (doc) {
        const delayTime = 28800000;
        if (delayTime - (Date.now() - doc.trabalharCooldown) > 0) {
          const _time = ms(delayTime - (Date.now() - doc.trabalharCooldown));
          let cooldown = new discord.MessageEmbed()
            .setAuthor({
              name: `» Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para coletar o seu salário.`,
              iconURL: client.warn,
            })
            .setColor(client.cor);
          return interaction.reply({ embeds: [cooldown] });
        } else {
          doc.animecoins += salario;
          doc.trabalharCooldown = Date.now();
          let trabalho = new discord.MessageEmbed()
            .setAuthor({
              name: `» Você resgatou suas ${salario} animecoins no trabalho.`,
              iconURL: "https://i.imgur.com/3y540mY.png",
            })
            .setImage("https://i.imgur.com/2Zm6WZz.png")
            .setColor(client.cor);
          interaction.reply({ embeds: [trabalho] });
          doc.save();
          if (doc.config.notificarwork === true) {
            client.db.Guilds.findOne(
              { _id: "531574473644703744" },
              function (err, not) {
                const _date = new Date();
                _date.setHours(_date.getHours() + 8);
                const date = new Date(_date);
                not.workschedule.push({
                  _id: interaction.member.id,
                  schedule: date,
                });
                not.save();

                schedule.scheduleJob(date, function () {
                  const webhookClient = new discord.WebhookClient({
                    url: "https://discord.com/api/webhooks/972829188421738516/z3cd69zBbUZ0be0t3soB_9MjRdR2wo_KsfZswdsRCRts-BdAUm8ZsN2cMzZIfLwuhlQk",
                  });
                  webhookClient.send({
                    content: `**[ATUALIZAÇÃO]** | Bó trabalhar? ||<@${interaction.member.id}>||`,
                    username: "Majime Mitsuya",
                    avatarURL: "https://i.imgur.com/BVsBVTR.png",
                  });
                  not.workschedule.pull({ _id: interaction.member.id });
                  not.save();
                });
              }
            );
          }
        }
      } else {
        new client.db.Users({ _id: interaction.member.id }).save();
        let registro = new discord.MessageEmbed()
          .setAuthor({ name: `» Tente Novamente.`, iconURL: client.err })
          .setColor(client.cor);
        return interaction.reply({ embeds: [registro] });
      }
    });
  },
};
