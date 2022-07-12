const discord = require('discord.js')
const { OpenWeatherMapApi } = require('node-ts-open-weather-map')
const openWeatherMapApi = new OpenWeatherMapApi({
  key: process.env.OpenWeatherMapApiKey
})

module.exports = {
  name: 'tempo',
  description: 'Veja informações sobre o tempo de uma cidade!',
  options: [
    {
      name: 'cidade',
      description: 'Qual a cidade?',
      type: 3,
      required: true
    }
  ],
  category: 'info',
  run: async (interaction, client) => {
    const cidade = interaction.options.getString('cidade')
    try {
      const data = await openWeatherMapApi.byCityName({
        name: cidade,
        contrycode: 'br'
      })
      const embed = new discord.MessageEmbed()
        .setAuthor({
          name: "Tempo em " + data.name,
          iconURL: "https://i.imgur.com/8N114C6.png",
        })
        .setColor(client.cor)
        .addField("Temperatura", `${data.main.temp}°C`, true)
        .addField("Umidade", `${data.main.humidity}%`, true)
        .addField("Pressão", `${data.main.pressure} hPa`, true)
        .addField("Velocidade do vento", `${data.wind.speed}Km/s`, true)
        .addField("Direção do vento", `${data.wind.deg}°`, true)
        .addField("Visibilidade", `${data.visibility}m`, true)
        .setImage("https://i.imgur.com/0w2eXFK.png");
      interaction.reply({ embeds: [embed] })
    } catch (err) {
      return interaction.reply({ content: 'Impossível encontrar a cidade!' })
    }
  }
}
