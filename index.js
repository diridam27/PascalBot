const fs = require('node:fs');
const path = require('node:path');
const { EmbedBuilder, Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json');

let perms = ['spart', 'tot'];

let baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection(); 
client.login(token);

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('aai')) {
		var douagalbenusuri = Math.floor(Math.random() * 16) == 15;
		var ban = douagalbenusuri ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 10) > 5 ? 1 : 0;
		console.log(`ID-ul !!!! ${interaction.customId.split('_')[1]}`) // afișează id-ul corect
		const autor = client.users.cache.get(interaction.customId.split('_')[1])
		baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
		const embed = new EmbedBuilder()
			.setAuthor({
			  name: '🎉',
			  iconURL: ban == 1 ? autor.displayAvatarURL() : interaction.user.displayAvatarURL(),
			})
			.setTitle(`${ban == 1 ? autor.username : interaction.user.username} a câștigat!`)
			.setDescription(`${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[0]}${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[1]}\n${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[2]}${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[3]} \n ${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[0]}${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[1]}\n${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[2]}${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[3]} \n\n ${douagalbenusuri ? `wow, se pare că oul lui ${ban == 1 ? autor.username : interaction.user.username} a avut două gălbenușuri! ` : ''}${douagalbenusuri ? '+2' : '+1'}<:galbenus:1491864355271217172>`)
	        await interaction.update({
            content: '',
            embeds: [embed],
            components: []
        });
    }
});