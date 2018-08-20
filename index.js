const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});
client.login(process.env.token);

bot.on("ready", async () => {
    console.log(`${bot.user.username} Estou Online !!`);
  
    bot.user.setActivity("Dublando, É Gravando", {type: "WATCHING"});

});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

if(cmd === `${prefix}kick`){
    var usuario = message.mentions.users.first();
    if(!message.guild.member(message.author.id).hasPermissions("KICK_MEMBERS")) return message.reply("você não tem permissão de usar esse comando")
    if(message.mentions.users.size < 1) return message.reply("você não mencinou ninguém")
    if(!message.guild.member(usuario).kickable) return message.reply("eu não posso kickar essa pessoa")

    var discord = require ('discord.js')
    var embed = new discord.RichEmbed()

   .setTitle("Você Foi Kickado Do Servidor **H.Y. Studios**")


    message.guild.member(usuario).kick()
    message.guild.member(usuario).send(embed)
    
    return message.channel.send(message.author + " O Usuario, Mencionado Foi Kickado ")        
}  
if(cmd === `${prefix}ban`){
    var razão = args.slice(1).join(" ")
    var usuario = message.mentions.users.first();
    if(!message.guild.member(message.author.id).hasPermissions("BAN_MEMBERS")) return message.reply("Você não tem permissão de usar esse comando")
    if(message.mentions.users.size < 1) return message.reply("Você não mencinou ninguém")
    if(!message.guild.member(usuario).bannable) return message.reply("Eu não posso banir essa pessoa")
    if(razão.length < 1) return message.reply("Você não colocou uma razão")

    message.guild.member(usuario).ban()

   var discord = require ('discord.js')

   var embed = new discord.RichEmbed()
   .setTitle(" Usuario Banido Do Servidor **H.Y. Studios** ")
   .addField("Usuario:",usuario.username)
   .addField("Razão:", razão);

   message.guild.member(usuario).send(embed)
   return message.channel.send(message.author + " O Usuario, Mencionado Foi Banido ")
}
if(cmd === `${prefix}tempmute`){
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Não Consigo Encontrar Esse Usuario.");
    if(tomute.hasPermission("MANAGE_ROLES")) return message.reply("Você não tem permissão para mutar essa pessoas");
    let muterole = message.guild.roles.find(`name`, "Muted");

    if(!muterole){
    try{
    muterole = await message.guild.createRole({
      name: "muted",
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

let mutetime = args[1];
if(!mutetime) return message.reply("Você não Especificou um Tempo");

await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> Foi Mutado (a) Durante ${ms(ms(mutetime))}`);

setTimeout(function(){
  tomute.removeRole(muterole.id);
  message.channel.send(`<@${tomute.id}> Você foi Desmutado (a)`);
}, ms(mutetime));

}
if(cmd === `${prefix}AvisoAdministração`){

    message.guild.members.map(membro => membro .send("**🔔Aviso Da Administração H.Y Studios🔔**\n\nOs  meus amores, como voces podem ver temos uma radio na H.Y Studios e estamos dando oportunidades para quem quer fazer parte dessa grande familia linda,\nquem quiser ser locutor da radio do HY, vai ter que fazer a inscrição no link a baixo que vai aparecer, pois essas aulas são para preparar os locutores quem vai ser escalados para locutar na radio do site, as aulas vão ser praticas, obrigada a todos amo voces.\n\nhttps://goo.gl/forms/aKv4LcDTktcWqYyB2\n*INSCRIÇÕES ATÉ DIA 21/08/2018*") )
    
return 
    
}  
if(cmd === `${prefix}AvisoEvento`){

   let sEmbed2 = new Discord.RichEmbed()
  .setColor("#5400ff")
  .setTitle("~~Aviso Evento H.Y. Studios~~")
  .addField( name="**[NOME DO EVENTO]**\n", "-----------------------------------------" )
  .addField("\n[TITULO DE INICIO]\n\n[AVISO]","-----------------------------------------")
  .addField("Convite Permanente Do Servidor:",url="https://discord.gg/qeSnRZf")
  .setImage(url="https://media.discordapp.net/attachments/479376642490499092/479787865669107755/hy_new_logo_2.png?width=500&height=500")
   message.guild.members.map(membro => membro .send(sEmbed2) )


return 

}
});

bot.login(config.token);
