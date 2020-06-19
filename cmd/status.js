const { version: discordVersion } = require("discord.js");
module.exports.run = async (client, message, args) => {
function msTime(milliseconds){
        var days = (milliseconds / (1000*60*60)) / 24;
        var d = Math.floor(days);
        var hours = (days - d) * 24;
        var h = Math.floor(hours);
        var minutes = (hours - h) * 60;
        var m = Math.floor(minutes);
        var seconds = (minutes - m) * 60;
        var s = Math.floor(seconds);
        return `${d > 0 ? `${d} Day${d > 1 ? 's, ' : ''}` : ''}${h > 0 ? `${h} ${h > 1 ? 's' : ''}` : ''}${m > 0 ? `${h > 0 ? ', ' : ''}${m} Minute${m > 1 ? 's' : ''}` : ''}${s > 0 ? `${m > 0 ? ', ' : ''}${s} Second${s > 1 ? 's' : ''}` : ''}`;
    }
        const embed = {
			"title":`Время работы`,
    "description": `${msTime(client.uptime)}`,
    "color": client.resolver.resolveColor('RANDOM'),
    "footer": {},
     fields: [
	     {
      "name": "Версия Discord Api",
      "value": `v${discordVersion}`,
      "inline": true
    },
	 {
      "name": "Использование ОЗУ",
      "value": `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      "inline": true
    },
	 {
      "name": "Версия Node.js",
      "value": `${process.version}`,
      "inline": true
    },
	 {
      "name": "Серверов",
      "value": `${client.guilds.size}`,
      "inline": true
    },
	 {
      "name": "Пользователей",
      "value": `${client.users.size}`,
      "inline": true
    },
	 {
      "name": "Каналов",
      "value": `${client.channels.size.toLocaleString()}`,
      "inline": true
    }
	 ]
  };
        message.channel.send({ embed });
}

module.exports.help = {
  name: "status"
}
