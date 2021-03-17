const Discord = require('discord.js'); //npm i discord.js
const fs = require('fs'); //npm i fs
require('dotenv').config(); //npm i dotenv
const ytdl = require('ytdl-core'); //https://www.npmjs.com/package/ytdl-core
const ytSearch = require('yt-search'); // https://www.npmjs.com/package/yt-search
const { search } = require('ffmpeg-static'); //for ffmpeg watch this tutorial: https://www.youtube.com/watch?v=r1AtmY-RMyQ&t
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const prefix = 'm '
client.commands = new Discord.Collection();
client.login(process.env.TOKEN);

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
//client ready
client.on('ready', () => {
    console.log('We are online!');
    client.user.setActivity('m!help');

});
//message guilds
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command =client.commands.get(cmd) || client.commands.find(a=> a.aliases && a.aliases.includes(cmd));
    if (command)command.execute(message,cmd,args,Discord)




})
