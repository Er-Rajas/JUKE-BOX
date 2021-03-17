

module.exports = {
    name: 'help',
    aliases:[],
    discription: 'this is commands fo this bots',
    execute(message,cmd,args,Discord) {


        const Embed = new Discord.MessageEmbed()

        .setTitle(' **JUKE-BOX**')

        .setDescription('JUKE BOX COMMAND \n ----------')
        .setColor('#FF7F50')
        .addFields(
            // { name: '**PREFIX**', value: 'm!' },
            { name: '**HELP**', value: '`m!help`', inline: true },
            { name: '**PLAY**', value: '  \n  `m!play `',inline: true },
            // { name: '\u200B',value: '\u200B' },
            {name: '**PAUSE**', value: '`m!pause`',inline:true},
            {name: '**RESUME**', value:'`m!resume`',inline: true},
            { name: '**SKIP**', value: '  \n  `m!skip`',inline: true },
            { name: '**LEAVE**', value: ' \n  `m!leave`',inline: true },
            
            // { name: '\u200B',value: '\u200B',inline: true },
            // { name: '\u200B',value: '\u200B',inline:true },
            // { name: 'join my server', value: 'https://discord.gg/2y2Nw9feXA',inline: true },
            



        )
        .setURL('https://jukebox-thediscordbot.godaddysites.com/')
        .addField('`NOTE: bugs may aries`','----------')
        .addField('`REPORT BUG HERE`','https://github.com/Pi-exe/JUKE-BOX')
        .setImage('https://25.media.tumblr.com/81104b5b801f2140b2a3643fb8432b2d/tumblr_mnk1i6WcOt1s6b4h0o1_400.gif')
        .setFooter('*By EXECUTABLE*')
        .setTimestamp()
        // .setAuthor('*BY EXECUTABLES*', '', '')
        message.channel.send(Embed)

    }


}
