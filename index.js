const {
    Client,
    GatewayIntentBits,
    ChannelType
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Replace with your trigger channel IDs
const triggerChannels = [
    '1513027490392838154',
    '1513028399902232739',
    '1513028476918300742',
    '1513028460426170558'
];

client.on('voiceStateUpdate', async (oldState, newState) => {

    if (triggerChannels.includes(newState.channelId)) {

        const channel = await newState.guild.channels.create({
            name: `${newState.member.user.username}'s VC`,
            type: ChannelType.GuildVoice,
            parent: newState.channel.parent
        });

        await newState.member.voice.setChannel(channel);
    }

    if (
        oldState.channel &&
        oldState.channel.members.size === 0 &&
        !triggerChannels.includes(oldState.channel.id)
    ) {
        oldState.channel.delete().catch(() => {});
    }
});

client.login(process.env.TOKEN);
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
console.log("TOKEN LENGTH:", process.env.TOKEN?.length);
client.login(process.env.TOKEN)
    .then(() => console.log('Login request sent'))
    .catch(console.error);
