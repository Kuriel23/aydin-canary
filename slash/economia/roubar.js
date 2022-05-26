const discord = require("discord.js");
const ms = require("parse-ms-2");
const schedule = require('node-schedule');

module.exports = {
  name: "roubar",
  description: "Que grande micagem eim! | Cooldown: 3 horas",
  category: "economia",
  run: async (interaction, client) => {
    const respostas = [
      "Prisão",
      "Banco",
      "Supermercado",
      "Farmácia",
      "Joalheria",
      "Loja de Tecnologia",
      "Pileque",
      "Escola",
      "Puteiro",
      "The King Shop",
      "Petshop",
      "Restaurante",
    ];
    const resultadoAleatorio = Math.floor(Math.random() * respostas.length);
    const result =
      respostas[
        respostas.length == 1
          ? 0
          : resultadoAleatorio == 0
          ? resultadoAleatorio + 1
          : resultadoAleatorio - 1
      ];

    client.db.Users.findOne(
      { _id: interaction.member.id },
      function (err, doc) {
        if (doc) {
          const delayTime = 10800000;
          if (delayTime - (Date.now() - doc.roubarCooldown) > 0) {
            const _time = ms(delayTime - (Date.now() - doc.roubarCooldown));
            const embed = new discord.MessageEmbed()
              .setAuthor({
                name: `» Espere: ${_time.hours}h, ${_time.minutes}m, e ${_time.seconds}s para fazer roubos.`,
                iconURL: client.err,
              })
              .setColor(client.cor);
            return interaction.reply({ embeds: [embed] });
          }
          if (delayTime - (Date.now() - doc.roubarCooldown) < 0) {
            function embed(title, icon) {
              return new discord.MessageEmbed()
                .setAuthor({ name: title, iconURL: icon })
                .setColor(client.cor);
            }
            if (result === "Restaurante") {
              let restaurante =
                Math.floor(Math.random() * (5000 - 3000)) + 3000;
              doc.animecoins += restaurante;
              doc.roubarCooldown = Date.now();
              doc.save();
              let restauranteemb = embed(
                `» Você foi em um restaurante, obtendo ${restaurante} moedas no roubo, além disso você aproveitou para comer.`,
                "https://i.imgur.com/xKf9xG9.png"
              );
              interaction.reply({ embeds: [restauranteemb] });
            }
            if (result === "Puteiro") {
              let puteiro = Math.floor(Math.random() * (1000 - 500)) + 500;
              doc.animecoins += puteiro;
              doc.roubarCooldown = Date.now();
              doc.save();
              let puteiroemb = embed(
                `» Você foi para o puteiro, obtendo ${puteiro} moedas no roubo. (Não faço mínima ideia porquê quis roubar puteiro mas ok)`,
                "https://i.imgur.com/o8u3FJo.png"
              );
              interaction.reply({ embeds: [puteiroemb] });
            }
            if (result === "The King Shop") {
              let theking = Math.floor(Math.random() * (2000 - 1000)) + 1000;
              doc.animecoins += theking;
              doc.roubarCooldown = Date.now();
              doc.save();
              let thekingshop = embed(
                `» Você foi para o The King Shop, obtendo ${theking} moedas no roubo.`,
                "https://i.imgur.com/EJAhJqP.png"
              );
              interaction.reply({ embeds: [thekingshop] });
            }
            if (result === "Banco") {
              let banco = Math.floor(Math.random() * (10000 - 5000)) + 5000;
              doc.animecoins += banco;
              doc.roubarCooldown = Date.now();
              doc.save();
              let bancoemb = embed(
                `» Você foi para o banco, obtendo ${banco} moedas no roubo.`,
                "https://i.imgur.com/fCzN1wV.png"
              );
              interaction.reply({ embeds: [bancoemb] });
            }
            if (result === "Supermercado") {
              let supermercado = Math.floor(Math.random() * (1000 - 0)) + 1;
              doc.animecoins += supermercado;
              doc.roubarCooldown = Date.now();
              doc.save();
              let supermercadoemb = embed(
                `» Você foi para o supermercado, obtendo ${supermercado} moedas no roubo.`,
                "https://i.imgur.com/e7umFuG.png"
              );
              interaction.reply({ embeds: [supermercadoemb] });
            }
            if (result === "Farmácia") {
              let farmacia = Math.floor(Math.random() * (1000 - 0)) + 1;
              doc.animecoins += farmacia;
              doc.roubarCooldown = Date.now();
              doc.save();
              let farmaciaemb = embed(
                `» Você foi para a farmácia, obtendo ${farmacia} moedas no roubo.`,
                "https://i.imgur.com/Vpzjozb.png"
              );
              interaction.reply({ embeds: [farmaciaemb] });
            }
            if (result === "Joalheria") {
              let joalheria = Math.floor(Math.random() * (5000 - 1000)) + 1;
              doc.animecoins += joalheria;
              doc.roubarCooldown = Date.now();
              doc.save();
              let joalheriaemb = embed(
                `» Você foi para a joalheria, obtendo ${joalheria} moedas no roubo.`,
                "https://i.imgur.com/hDNIWwg.png"
              );
              interaction.reply({ embeds: [joalheriaemb] });
            }
            if (result === "Loja de Tecnologia") {
              let tecnologialoja =
                Math.floor(Math.random() * (5000 - 1000)) + 1000;
              doc.animecoins += tecnologialoja;
              doc.roubarCooldown = Date.now();
              doc.save();
              let loja = embed(
                `» Você foi para a loja de tecnologia, obtendo ${tecnologialoja} moedas no roubo.`,
                "https://i.imgur.com/ObXaJW8.png"
              );
              interaction.reply({ embeds: [loja] });
            } else if (
              result === "Pileque" ||
              result === "Escola" ||
              result === "Prisão" ||
              result === "Petshop"
            ) {
              let embedfalhado;
              doc.roubarCooldown = Date.now();
              doc.save();
              if (result === "Pileque") {
                embedfalhado = embed(
                  `» Você tentou roubar pileque, mas ele te deu ban.`,
                  "https://i.imgur.com/k4CBCyL.png"
                );
              }
              if (result === "Escola") {
                embedfalhado = embed(
                  `» Porquê tu foi tentar roubar uma escola? O governo sempre coloca PIN em tudo caso não esteja na escola.`,
                  "https://i.imgur.com/xxczyVm.png"
                );
              }
              if (result === "Prisão") {
                embedfalhado = embed(
                  `» Você foi preso.`,
                  "https://i.imgur.com/vaWmXm5.png"
                );
              }
              if (result === "Petshop") {
                embedfalhado = embed(
                  `» Você roubou um pet no petshop. Infelizmente, você é um péssimo ladrão já que você não aguentou a fofura.`,
                  "https://i.imgur.com/SLdCdOF.png"
                );
              }
              interaction.reply({ embeds: [embedfalhado] });
            }
            if (doc.config.notificarob === true) {
              client.db.Guilds.findOne(
                { _id: "531574473644703744" },
                function (err, not) {
                  const _date = new Date();
                  _date.setHours(_date.getHours() + 8);
                  const date = new Date(_date);
                  not.robschedule.push({
                    _id: interaction.member.id,
                    schedule: date,
                  });
                  not.save();

                  schedule.scheduleJob(date, function () {
                    const webhookClient = new discord.WebhookClient({
                      url: "https://discord.com/api/webhooks/972829188421738516/z3cd69zBbUZ0be0t3soB_9MjRdR2wo_KsfZswdsRCRts-BdAUm8ZsN2cMzZIfLwuhlQk",
                    });
                    webhookClient.send({
                      content: `**[ATUALIZAÇÃO]** | Eaí novato, bora assaltar algo ae namoral. ||<@${interaction.member.id}>||`,
                      username: "Kazuma Satou",
                      avatarURL: "https://i.imgur.com/wUmDQCL.jpeg",
                    });
                    not.robschedule.pull({ _id: interaction.member.id });
                    not.save();
                  });
                }
              );
            }
          }
        }
        if (!doc) {
          new client.db.Users({ _id: interaction.member.id }).save();
          let registro = new discord.MessageEmbed()
            .setAuthor({ name: `» Tente Novamente.`, iconURL: client.err })
            .setColor(client.cor);
          return interaction.reply({ embeds: [registro] });
        }
      }
    );
  },
};
