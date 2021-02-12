module.exports = {
    name: 'help',
    aliases:[],
    discription: 'this is commands fo this bots',
    execute(message,args, cmd, client, Discord) {

        // YOU CAN MAKE YOUR OWN EMBED, for more REFFER https://discordjs.guide/popular-topics/embeds.html
        // If you don't need  all the elements showcased below. If you want a simpler embed, just leave some out. :)
        const Embed = new Discord.MessageEmbed()
        
        .setTitle(' **JUKE-BOX**')
        
        .setDescription('JUKE BOX COMMAND \n ----------')
        .setColor('#FFFFFF')  //set emmbed color in hex codes default black
        .addFields(
            // { name: '**PREFIX**', value: 'm!' },
            { name: '**HELP**', value: '`m!help`', inline: true },
            { name: '**PLAY**', value: '  \n  `m!play song`',inline: true },
            // { name: '\u200B',value: '\u200B' }, //if you want to add blank space use this 
            { name: '**SKIP**', value: '  \n  `m!skip`',inline: true },
            { name: '**LEAVE**', value: ' \n  `m!leave`',inline: true },
            { name: '\u200B',value: '\u200B',inline: true },
            { name: '\u200B',value: '\u200B',inline:true },
            { name: 'join my server', value: 'server address',inline: true },
            { name: 'REPORT BUG HERE', value: 'gitt repo.',inline: true },
            
            

        )
        .setURL('')//bot website if any
        .addField('`NOTE: bugs may aries`','----------')
        .setImage('https://i.imgur.com/eCGr748.gif')
        .setFooter('') 
        .setTimestamp()
        // .setAuthor('', '', '')  
        message.channel.send(Embed)

    }


}
