const Discord = require('discord.js');
const weather = require('weather-js');

module.exports.run = (client, message, args) => {
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
          message.channel.send('Пожалуйста, введите местоположение! Например: h!weather <ваш город>')
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Погода для ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor('RANDOM')
          .addField('Часовой пояс',`UTC${location.timezone}`, false)
          .addField('Тип',location.degreetype, true)
          .addField('Температура',`${current.temperature} градусов`, true)
          .addField('Как будто', `${current.feelslike} градусов`, true)
          .addField('Ветра',current.winddisplay, true)
          .addField('Влажность', `${current.humidity}%`, true)

          message.channel.send({embed});
  })
}
exports.help = {
    name: "weather"
  }