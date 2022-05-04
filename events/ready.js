module.exports = async (client) => {
  client.user.setActivity(`Envie DM para suporte`, {
    type: "WATCHING",
  });
  let activities = [
		`a?ajuda para ajuda`,
		`animesonlinegames.com`,
		`animesorionvip.com`,
		`myanimelist.vip`,
		`superhentaisvip.net`,
		`goyabu.vip`,
		`www.animesgamesbot.ml`,
		`Envie DM para suporte`
	],
		i = 0;
  setInterval(() => {
    client.user.setActivity(activities[i++ % activities.length], {
      type: "WATCHING",
    });
  }, 15000);
};
