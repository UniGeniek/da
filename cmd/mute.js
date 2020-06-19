const Discord = require("discord.js");
const ms = require("fs");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Я не нашёл человека.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Его роль выше меня.");
  let muterole = message.guild.roles.find(muterole => muterole.name === "Мученик");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Мученик",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Ты не указал время на сколько его заткнуть.");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> замучен на ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> был размучен!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}; 