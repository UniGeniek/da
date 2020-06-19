const Discord = module.require("discord.js");
const fs = require('fs');
const client = new Discord.Client();

module.exports.run = async (bot,message,args) =>{
    var user = '';
    temp = message.mentions.users.array()
    for(var key in temp)
    {
        if (temp[key] != message.author && temp[key] != undefined) user += temp[key] + ' '
    }
    
    var contents = fs.readFileSync('./gifkiss.txt', { 'encoding': 'utf8'});
    gif = contents.split('\n');
    gif = gif[Math.floor(Math.random() * gif.length)]
    message.channel.send({embed: {
        color: 431075,
        description: message.author + `  поцеловал  ` + user + `:two_hearts: :revolving_hearts: :two_hearts:`,
        image:
        {
            url: gif
        }
      }
    })
    message.delete(500);
};


module.exports.help = {
    name: "kiss"
};