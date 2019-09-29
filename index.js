const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "é"

var dispatcher;

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`Bot: Hosting ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setStatus('dnd', 'cc')
    client.user.setActivity("https://nahtan.xyz", {type: "STREAMING"});
    var generalChannel = client.channels.get("624364371849642014")
    generalChannel.send("`Loading..`")
});

client.on("guildMemberAdd", member => {
    member.guild.channels.get('609772189247340557').send(member.user + ', wolle comme back sure mont __discord__' + ' **[**' + member.guild.memberCount + '**]**')
})

client.on("guildMemberRemove", member => {
    member.guild.channels.get('609772189247340557').send(member.user + ', ile a quité leu filles de putees' + ' **[**' + member.guild.memberCount + '**]**')
})


client.on('message', message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    if (message.content === prefix + "discord"){
        var commands_embed = new Discord.RichEmbed()
            .setTitle("https://nahtan.xyz/discord", true)
            .setColor("#4f88ca")
        message.channel.sendEmbed(commands_embed);
    }
 
    if (message.content === prefix + "namemc"){
        var commands_embed = new Discord.RichEmbed()
            .setTitle("https://fr.namemc.com/server/xsfot", true)
            .setColor("##277929")
        message.channel.sendEmbed(commands_embed);
    }

    if (message.content === prefix + "twitter"){
        var commands_embed = new Discord.RichEmbed()
            .setTitle("https://twitter.com/nahtaaan10")
            .setColor("#00beff")
        message.channel.sendEmbed(commands_embed);
    }
    if (command == "say") {
        message.delete()
        const embed = new Discord.RichEmbed()
        .setDescription(message.author.username + ": " + args.join(" "))
        .setColor("#ffffff")
        message.delete();
        message.channel.send({embed})
        }
    })

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("perm :false:")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("mention :false:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("kick false 2")
       if (!member.kickable) return message.channel.send("kick :false")
       member.kick()
       message.channel.send(member.user.username + ' has been kicked')
    }
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("perm :false:")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("mention :false:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("ban false 2")
       if (!member.bannable) return message.channel.send("ban :false:")
       message.guild.ban(member, {days: 7})
       message.channel.send(member.user.username + ' has been banned')
    }
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("perm :false:")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("numbers")
        if (isNaN(count)) return message.channel.send("valid numbers")
        if (count < 1 || count > 100) return message.channel.send("1 / 100")
        message.channel.bulkDelete(count + 1, true)
        message.channel.send(' :writing_hand: ')
    }

    if (args[0].toLowerCase() === prefix + "unmute") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
        if(!member.manageable) return message.channel.send("Je ne pas unmute ce membre.")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' has been unmuted')
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("perm :false:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("member :false:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (!member.manageable) return message.channel.send("mute :false:")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' has been muted')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' :white_check_mark:')
            })
       }
    };

    })
