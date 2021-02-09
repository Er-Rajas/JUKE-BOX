module.exports = {
    name: 'help',
    aliases:[],    //aliases refer https://davidwalsh.name/destructuring-alias#:~:text=The%20syntax%20for%20specifying%20an,to%20keep%20in%20your%20locker!
    discription: 'this is commands fo this bots',
    execute(message,args, cmd, client, Discord) {


        const Embed = new Discord.MessageEmbed()
        //this is a embed, change the text if you want
        .setTitle(' **COMMANDS**')
        .setDescription('THIS ARE MY COMMANDS \n ----------')
        .setColor('#FFFFFF')   //set your own colour in hex default is red
        .addFields(
            { name: '**PREFIX**', value: 'm!' },
            { name: 'COMMAND 1', value: '**HELP**  \n //for list of commands\n `m!help`' },
            { name: 'COMMAND 2', value: '**PLAY**  \n //plays the song or create a queue\n `m!play <song name>or<link>`' },
            { name: 'COMMAND 3', value: '**SKIP**  \n //plays the next tsong in queue \n `m!skip`' },
            { name: 'COMMAND 4', value: '**LEAVE** \n //leaves the voice channel \n `m!leave`' },
            { name: '**NOTE**', value: '*DONT USE "<>" while writing comands*' },

        )

        .addField('`NOTE: bugs may aries`','----------')
        .setImage('https://i.makeagif.com/media/8-14-2015/DsUXY8.gif')     //you can putt your own image link  here
        .setFooter('Thank for adding me to the server')                    //set your own footer
        .setTimestamp()
        message.channel.send(Embed)

    }


}
