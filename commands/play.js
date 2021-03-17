const Discord = require('discord.js')

// https://www.npmjs.com/package/ytdl-core
const ytdl = require('ytdl-core');
// https://www.npmjs.com/package/yt-search
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'player',
    aliases: ['play','skip', 'stop','pause','resume'],
    //We are using aliases to run the skip and stop command
    //follow this tutorial if lost to creating aliases: https://www.youtube.com/watch?v=QBUJ3cdofqc

    description: 'Advanced music bot',
    async execute(message,cmd,args,Discord){

        let msglink = args.join('%20')
        let msg = args.join(' ')
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send("**OOF I DON'T HAVE PERMISSION `TO CONNECT` \nCONTACT ADMIN**");
        if (!permissions.has('SPEAK')) return message.channel.send("**OOF I DON'T HAVE  PERMISSION `TO SPEAK` \nCONTTACT ADMIN**");

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play'){
            if (!args.length) return message.channel.send('You need to send the second argument!');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                // queue embed
                let Embed = new Discord.MessageEmbed()
                .setTitle('**JUKE BOX**')
                .setColor('#FF7F50')
                .setDescription('ADDING SONG')
                .addField(`sucessfully **${song.title}** added to queue!` , `${song.url}`)
                // .setFooter('Added by '  + message.author.tag,message.author.displayAvatarURL({ dynamic:true })+'\n')
                .setTimestamp()
                .setURL('https://jukebox-thediscordbot.godaddysites.com/')
                
                return message.channel.send(Embed).then((msg) =>{
                    msg.react('👍')
                })
                
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
        else if(cmd === 'pause') pause_song(message, server_queue);
        else if(cmd === 'resume') resume_song(message, server_queue) 
    }

}

const video_player = async (guild, song,message) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 1.0 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    // now playing embed
    let newembed = new Discord.MessageEmbed()
    .setTitle("**JUKE BOX**")
    .setDescription('**NOW PLAYING**')
    .setColor('#FF7F50')
    .addField(`🎶**${song.title}** 🎶`, `${song.url}`)
    .setTimestamp()
    .setURL('https://jukebox-thediscordbot.godaddysites.com/')
    // .addFooter('Added by ' + message.author.tag,message.author.displayAvatarURL({ dynamic:true }))
    await song_queue.text_channel.send(newembed).then((msg)=>{
        msg.react('👍')
    })
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to execute this command!');
    else if (message.channel.send(`😭 **I AM LEAVING NOW,BYE BYE! **`).then((msg)=>{       //leaving channel
        msg.react('👍')
        msg.react('😭')
    }))

    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}
const pause_song = (message,server_queue) =>{
    if(server_queue.connection.dispatcher.paused) return message.channel.send('`Song is already paused`')
        server_queue.connection.dispatcher.pause();
        message.channel.send('Player paused.')
}
const resume_song = (message,server_queue) =>{
    if (!server_queue.connection.dispatcher.paused) return message.channel.send("song isn't paused")
    server_queue.connection.dispatcher.resume();
    message.channel.send('Resuming player')

}