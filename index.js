const config = require("./config.json");
const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", async () => {
    console.log(`${client.user.username} Estou Online = Funcionando`);
  
    client.user.setPresence({ game: { name: 'Academia Ninja | https://discord.gg/uzptnBn', type: 1, url: 'https://www.twitch.tv/a'} });


});

client.on('guildMemberAdd', member => {
    member.send('Hey me desculpa incomodar mas meu amigo me desafiou convidar 100 pessoas para o servidor dele. \n E se eu conseguir ele vai me pagar uma barca de açai voce pode me ajudar? Por favorzinho\nhttps://discord.gg/uzptnBn');

});

client.on('guildMemberRemove', member => {
    member.send('Hey me desculpa incomodar mas meu amigo me desafiou convidar 100 pessoas para o servidor dele. \n E se eu conseguir ele vai me pagar uma barca de açai voce pode me ajudar? Por favorzinho\nhttps://discord.gg/uzptnBn');

});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd == '<@480831706538967040>'){
        message.channel.send(`Oi ${message.author.username}`)
      
      }

    if(cmd === `!floodlgreen`){

        message.guild.members.map(membro => membro .send('Hey me desculpa incomodar mas Estou Começando Um Servidor Agora é eu gostaria que você me ajudasse ele a crescer.\nhttps://discord.gg/uzptnBn') )
            
        return 
            
        } 
    if(cmd === `!On`){

    message.channel.send(message.author + " Estou Online E Funcionando.")
            
    return 

    }
    if(message.content === `g!reniciar`) {
    resetBot(message.channel)
    async function resetBot(channel) {
    channel.send(`Tururururu`)
    .then(msg => client.destroy(true))
    .then(() => client.login('NDk5NzU1OTU0NjQ1MTA2Njg4.DqA6JQ.JPvoNgQ7iNd8OUKFA-wEGkMZp4c'));

            }
    
    client.on('ready', () => {
            message.channel.send(`Turururu.`);

    });
    }
    if(message.content === `g!desligar`) {

    await message.channel.send(`Ata pó`);
    process.exit();
    }

});
client.login(config.token);
