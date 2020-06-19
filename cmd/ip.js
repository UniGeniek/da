const Discord = require("discord.js")
exports.run = (client, message, args) => {
    var whoami = message.mentions.members.first()
    if (!whoami) return message.reply("Выбери пользователя/")
    const embed = new Discord.RichEmbed()
        .setTitle(` ${whoami.user.tag}`)
        .addField("Ник", whoami.user.tag)
        .addField("ID", whoami.id)
        .addField("Дата  регистрации", whoami.user.createdAt)
        .addField("Дата когда вошёл", whoami.joinedAt)
        .addField("Бот ли?", whoami.user.bot)
        .addField("Тэг", whoami.user.discriminator)
        .setThumbnail(whoami.user.avatarURL)
		.setColor('RANDOM')
    message.channel.send(embed)
}
exports.help = {
    name: "info"
  }