const Discord = require("discord.js");

const bot = new Discord.Client();

const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {

    try {

        const { body } = await snekfetch

            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')

            .query({ limit: 800 });

        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);

        if (!allowed.length) return message.channel.send('Тут как-бы нету мемов, попробуй позже.');

        const randomnumber = Math.floor(Math.random() * allowed.length)

        const embed = new Discord.RichEmbed()

        .setColor(0x00A2E8)

        .setTitle(allowed[randomnumber].data.title)

        .setDescription("Опубликован юзером: " + allowed[randomnumber].data.author)

        .setImage(allowed[randomnumber].data.url)

        .addField("Другая информация:", "Ап воты: " + allowed[randomnumber].data.ups + " / Комментарии: " + allowed[randomnumber].data.num_comments)

        .setFooter("Мемы получены с dankmemes")

        message.channel.send(embed)

    } catch (err) {

        return console.log(err);

    }

}


exports.help = {
    name: "dankmemes"
  }