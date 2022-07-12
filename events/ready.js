const schedule = require("node-schedule");
const superagent = require("superagent");
const discord = require("discord.js");
const webhookClient = new discord.WebhookClient({
  url: process.env.webhook,
});

module.exports = async (client) => {
  client.user.setActivity("Envie DM para suporte", {
    type: "WATCHING",
  });
  const activities = [
    "Prefixo: /",
    "animesonlinegames.com",
    "animesorionvip.com",
    "myanimelist.vip",
    "superhentaisvip.net",
    "goyabu.vip",
    "www.animesgamesbot.ml",
    "Envie DM para suporte",
  ];
  let i = 0;
  setInterval(() => {
    client.user.setActivity(activities[i++ % activities.length], {
      type: "WATCHING",
    });
  }, 15000);
  client.logger.log("> ✅ • Carregado com sucesso [DISCORD]", "success");
  repscheduler();
  dailyscheduler();
  workscheduler();
  robscheduler();
  crimescheduler();
  setInterval(() => {
    lanca();
    lancah();
  }, 30000);
  setInterval(() => {
    //youtube();
    handleNewsAnimes();
  }, 60000);

  async function repscheduler() {
    client.db.Guilds.findOne(
      { _id: "531574473644703744" },
      function (err, not) {
        for (let i = 0; i < not.repschedule.length; i++) {
          schedule.scheduleJob(not.repschedule[i].schedule, async function () {
            webhookClient.send({
              content: `**[ATUALIZAÇÃO]** | Você pode dar uma nova reputação. ||<@${not.repschedule[i]._id}>||`,
              username: "Mestre das Reputação",
              avatarURL: "https://i.imgur.com/06Ahjgz.jpeg",
            });
            not.repschedule.pull({ _id: not.repschedule[i]._id });
            await not.save();
          });
        }
      }
    );
  }

  // [ - DAILY SCHEDULER ]

  async function dailyscheduler() {
    client.db.Guilds.findOne(
      { _id: "531574473644703744" },
      function (err, not) {
        for (let i = 0; i < not.dailyschedule.length; i++) {
          schedule.scheduleJob(
            not.dailyschedule[i].schedule,
            async function () {
                    webhookClient.send({
                      content: `**[ATUALIZAÇÃO]** | Você pode resgatar o seu daily e depois me dá-lo, lembre-se você ainda me deve 5000 animecoins. ||<@${not.dailyschedule[i]._id}>||`,
                      username: "Jiraiya",
                      avatarURL: "https://i.imgur.com/BMHyycM.jpeg",
                    });
              not.dailyschedule.pull({ _id: not.dailyschedule[i]._id });
              await not.save();
            }
          );
        }
      }
    );
  }

  // [ - ROB SCHEDULER ]

  async function robscheduler() {
    client.db.Guilds.findOne(
      { _id: "531574473644703744" },
      function (err, not) {
        for (let i = 0; i < not.robschedule.length; i++) {
          schedule.scheduleJob(not.robschedule[i].schedule, async function () {
                    webhookClient.send({
                      content: `**[ATUALIZAÇÃO]** | Eaí novato, bora assaltar algo ae namoral. ||<@${not.robschedule[i]._id}>||`,
                      username: "Kazuma Satou",
                      avatarURL: "https://i.imgur.com/wUmDQCL.jpeg",
                    });
            not.robschedule.pull({ _id: not.robschedule[i]._id });
            await not.save();
          });
        }
      }
    );
  }

  // [ - WORK SCHEDULER ]

  async function workscheduler() {
    client.db.Guilds.findOne(
      { _id: "531574473644703744" },
      function (err, not) {
        for (let i = 0; i < not.workschedule.length; i++) {
          schedule.scheduleJob(not.workschedule[i].schedule, async function () {
                  webhookClient.send({
                    content: `**[ATUALIZAÇÃO]** | Bó trabalhar? ||<@${not.workschedule[i]._id}>||`,
                    username: "Majime Mitsuya",
                    avatarURL: "https://i.imgur.com/BVsBVTR.png",
                  });
            not.workschedule.pull({ _id: not.workschedule[i]._id });
            await not.save();
          });
        }
      }
    );
  }

  // [ - CRIME SCHEDULER ]

  async function crimescheduler() {
    client.db.Guilds.findOne(
      { _id: "531574473644703744" },
      function (err, not) {
        for (let i = 0; i < not.crimeschedule.length; i++) {
          schedule.scheduleJob(
            not.crimeschedule[i].schedule,
            async function () {
                webhookClient.send({
                  content: `**[ATUALIZAÇÃO]** | Eaí, tá na hora de fazer uns crimes. ||<@${not.crimeschedule[i]._id}>||`,
                  username: "Danjuro Tobita",
                  avatarURL: "https://i.imgur.com/ZJqo64P.jpeg",
                });
              not.crimeschedule.pull({ _id: not.crimeschedule[i]._id });
              await not.save();
            }
          );
        }
      }
    );
  }

  async function handleNewsAnimes() {
    const doc = await client.db.Guilds.findOne({ _id: "531574473644703744" });
    client.request
      .parseURL("https://imperionetwork.ml/animes/feed")
      .then((data) => {
        if (doc.newsdata.includes(data.items[0].link)) return 0;
        const scrape = require("metadata-parser");
        scrape(data.items[0].link).then(function (metadata) {
          const img = metadata.openGraph.image.url;
          client.channels.cache
            .get("842151745383694356")
            .send(
              "<@&842501545257730059>",
              new discord.MessageEmbed()
                .setAuthor({
                  name: " » Clique para ler",
                  iconURL: "https://imperionetwork.ml/wp-content/uploads/2021/12/wp-min.png",
                  url: data.items[0].link
                })
                .setTitle("📰 Nova Notícia")
                .addField("Título:", data.items[0].title)
                .setImage(img)
                .setTimestamp()
                .setColor(client.cor)
            );
          doc.newsdata = data.items[0].link;
          doc.save();
        });
      });
  }

  // [ - YOUTUBE TIMER ]

  async function youtube() {
    const doc = client.db.Guilds.findOne({ _id: "531574473644703744" });
    client.request
      .parseURL(
        "https://www.youtube.com/feeds/videos.xml?channel_id=UCaxpb7aXqxl7u74bxZ8do3Q"
      )
      .then((data) => {
        if (doc.ytdata.includes(data.items[0].link)) return 0;
        const linkyt = data.items[0].link.replace(
          "https://www.youtube.com/watch?v=",
          "https://youtu.be/"
        );
        client.channels.cache
          .get("790685035110858773")
          .send(`**Novo Vídeo** @everyone \n${linkyt}`);
        doc.ytdata = data.items[0].link;
        doc.save();
      });
  }

  async function lanca() {
    const doc = client.db.Guilds.findOne({ _id: "531574473644703744" });
    if (doc.notifylanca === true) {
      await superagent
        .get(
          "https://api-aog22.aog22.repl.co/GET.php?Funcao=Lancamentos_Episodios"
        )
        .set("Accept", "application/json")
        .end((err, res) => {
          const data = res.body.data[0];
          if (doc.lancadata.includes(data.ID_Episodio)) return 0;
          if (data.ID_Autor === "51678") return 0;
          const url = client.games + `?p=${data.ID_Episodio}`;
          const button = new MessageButton()
            .setStyle("url")
            .setURL(url)
            .setLabel("» Assistir Online")
            .setEmoji("▶️");

          const row = new MessageActionRow().addComponent(button);

          let cc = "";
          if (data.CC === "Dub") cc = "Dublado";

          const embed = new discord.MessageEmbed()
            .setAuthor({
              name: " » Clique para assistir",
              iconURL: "https://i.imgur.com/pzJ6TgL.png",
              url: url,
            })
            .setTitle("🎉 Novo lançamento")
            .addField(
              "Nome do Episódio:",
              `**${data.Titulo} Episódio ${data.Nr_Episodio} ${cc}**`
            )
            .setImage(data.Thumbnail)
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/752390178861088870/788174666891657306/oie_RWRPq03dYwrV.gif"
            )
            .setFooter({ text: "Animes Online Games" })
            .setTimestamp()
            .setColor(client.cor);
          client.channels.cache.get("675436978510233667").send({
            content: "<@&840707996220129290>",
            embeds: [embed],
            component: row,
          });
          doc.lancadata = data.ID_Episodio;
          doc.save();
        });
    }
  }

  async function lancah() {
    const doc = await client.db.Guilds.findOne({ _id: "531574473644703744" });
    await superagent
      .get("https://api-sh.aventuraland.repl.co/?Funcao=ultimos_lancamentos")
      .set("Accept", "application/json")
      .end((err, res) => {
        const data = res.body.data[0];
        if (doc.lancahdata.includes(data.ID_Ep)) return 0;
        const url = client.sh + `?p=${data.ID_Ep}`;
        const button = new discord.MessageButton()
          .setStyle("LINK")
          .setURL(url)
          .setLabel("» Assistir Online")
          .setEmoji("▶️");

        const row = new MessageActionRow().addComponent(button);

        const embed = new discord.MessageEmbed()
          .setAuthor({
            name: " » Clique para assistir",
            iconURL: "https://i.imgur.com/9B3ju2M.png",
            url: url,
          })
          .setTitle("🎉 Novo lançamento")
          .addField(
            "Nome do Episódio:",
            `**${data.Name_Ep} Episódio ${data.Nr_Ep}**`
          )
          .setImage(data.Thumnail_Ep)
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/752390178861088870/788174666891657306/oie_RWRPq03dYwrV.gif"
          )
          .setFooter({ text: "Super Hentais" })
          .setTimestamp()
          .setColor(client.cor);
        client.channels.cache.get("945002180237201478").send({
          content: "<@&944999640795861012>",
          embeds: [embed],
          component: row,
        });
        doc.lancahdata = data.ID_Ep;
        doc.save();
      });
  }
};
