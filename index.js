const fs = require('node:fs');
const path = require('node:path');
const { EmbedBuilder, Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { token } = require('./config.json');
const { title } = require('node:process');

let perms = ['spart', 'tot'];

const skinuri = [
    "batik",
    "ucraina",
    "suceava",
    "viena",
    "rosu",
    "washi",
    "grecia",
    "rusia"
]


let baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

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

client.on('guildMemberAdd', (member) => {
  let baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));

  const nume = member.user.username;

  if (!baza.users[nume]) {
    baza.users[nume] = {
			skin: "rosu",
			galbenusuri: 0,
			proteina: 0,
			winningStreak: 0,
			losingStreak: 0,
			achievements: {
				tareInOua: false,
				credCaEDeLemn: false,
				dacaNuMaGasestiLaLapte: false,
				maiDaDinOua: false,
				euSuntUrsul: false,
				undeSDoiPutereaCreste: false,
				aiDatStramb: false,
				omletteDuFromage: false,
				proteina: false
			},
			skinuri: {
				rosu: 1,
				batik: 0,
				rusia: 0,
				grecia: 0,
				suceava: 0,
				ucraina: 0,
				viena: 0,
				washi: 0
			}
		}
  	}
	console.log(`A VENIT ${member.username}!`)
	fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "\t"));
});

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

	if (interaction.customId.startsWith('accept')) {
		console.log("log !! - " + interaction.customId);
		const [prefix, autorId, vreau, dau] = interaction.customId.split('_');
		const autor = client.users.cache.get(autorId);
		if (!autor || !vreau || !dau) {
			return await interaction.reply({ content: 'Accept button data is invalid.', ephemeral: true });
		}
		baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
		const userData = baza.users[interaction.user.username];
		const autorData = baza.users[autor.username];
		if (!userData || !autorData) {
			return await interaction.reply({ content: 'Datele utilizatorului nu au fost găsite.', ephemeral: true });
		}
		if (!userData.skinuri[vreau] || userData.skinuri[vreau] <= 0) {
			return await interaction.reply({ content: `Nu ai niciun ou ${vreau} în colecție.`, ephemeral: true });
		}
		const amBatutPalma = new EmbedBuilder()
		.setTitle(`Am bătut palma!`)
		.setDescription(`${autor.username}:handshake:${interaction.user.username}`);
		baza.users[interaction.user.username].skinuri[vreau] -= 1;
		baza.users[autor.username].skinuri[vreau] += 1;
		baza.users[interaction.user.username].skinuri[dau] += 1;
		baza.users[autor.username].skinuri[dau] -= 1;
		await interaction.update({
			content: '',
			embeds: [amBatutPalma],
			components: [],
		});
		if (autorData.achievements.maiDaDinOua == false) {
		embedAchievement = new EmbedBuilder()
		.setTitle(baza.achievements.maiDaDinOua.title)
		.setDescription(baza.achievements.maiDaDinOua.description);
		client.users.send(autor, {
			embeds: [embedAchievement],
			content: `Achievement n**ou** !!`
		});
		autorData.achievements.maiDaDinOua = true;
	}
	if (userData.achievements.maiDaDinOua == false) {
		embedAchievement = new EmbedBuilder()
		.setTitle(baza.achievements.maiDaDinOua.title)
		.setDescription(baza.achievements.maiDaDinOua.description);
		client.users.send(interaction.user, {
			embeds: [embedAchievement],
			content: `Achievement n**ou** !!`
		});
		userData.achievements.maiDaDinOua = true;
	}
	if(baza.users[interaction.user.username].achievements.dacaNuMaGasestiLaLapte == false)
	{
		var ok = true;
		for(i = 0; i < skinuri.length; i++)
		{
			if(baza.users[interaction.user.username].skinuri[skinuri[i]] == 0)
			{
				ok = false
				break;
			}
		}
		if(ok == true)
		{
		   var embedAchievement = new EmbedBuilder()
			.setTitle(baza.achievements.dacaNuMaGasestiLaLapte.title)
			.setDescription(baza.achievements.dacaNuMaGasestiLaLapte.description);
			client.users.send(interaction.user,
				{
					embeds:[embedAchievement],
					content:`Achievement n**ou** !!`
				}
			);
			baza.users[interaction.user.username].achievements.dacaNuMaGasestiLaLapte = true;
			fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "\t"));
		}
	}
	if(baza.users[autor.username].achievements.dacaNuMaGasestiLaLapte == false)
	{
		var ok = true;
		for(i = 0; i < skinuri.length; i++)
		{
			if(baza.users[autor.username].skinuri[skinuri[i]] == 0)
			{
				ok = false
				break;
			}
		}
		if(ok == true)
		{
		   var embedAchievement = new EmbedBuilder()
			.setTitle(baza.achievements.dacaNuMaGasestiLaLapte.title)
			.setDescription(baza.achievements.dacaNuMaGasestiLaLapte.description);
			client.users.send(autor,
				{
					embeds:[embedAchievement],
					content:`Achievement n**ou** !!`
				}
			);
			baza.users[autor.username].achievements.dacaNuMaGasestiLaLapte = true;
			fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "\t"));
		}
	}
	fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "	"));
}

    if (interaction.customId.startsWith('aai')) {
		var douagalbenusuri = Math.floor(Math.random() * 16) == 15;
		var ban = douagalbenusuri ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 10) > 5 ? 1 : 0;
		console.log(`ID-ul !!!! ${interaction.customId.split('_')[1]}`) // afișează id-ul corect
		console.log("log !! - " + interaction.customId);
		const autor = client.users.cache.get(interaction.customId.split('_')[1])
		baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
		let embed = new EmbedBuilder()
			.setAuthor({
			  name: '🎉',
			  iconURL: ban == 1 ? autor.displayAvatarURL() : interaction.user.displayAvatarURL(),
			})
			.setTitle(`${ban == 1 ? autor.username : interaction.user.username} a câștigat!`)
			.setDescription(`${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[0]}${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[1]}\n${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[2]}${baza.emoaje[baza.users[autor.username].skin][perms[ban]].sus[3]}\n${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[0]}${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[1]}\n${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[2]}${baza.emoaje[baza.users[interaction.user.username].skin][perms[1 - ban]].jos[3]} \n\n ${douagalbenusuri ? `wow, se pare că oul lui ${ban == 1 ? autor.username : interaction.user.username} a avut două gălbenușuri! ` : ''}${douagalbenusuri ? '+2' : '+1'}<:galbenus:1491864355271217172>`);
		if(autor.username == interaction.user.username)
		{
			embed = new EmbedBuilder()
			.setTitle('Nu poți să ciocnești tu cu tine!')
			.setDescription('De ce nu cauți un prieten cu care să ciocnești?');;
		}
		else
		{
			baza.users[ban ? autor.username : interaction.user.username].winningStreak += 1;
			baza.users[!ban ? autor.username : interaction.user.username].losingStreak += 1;
			baza.users[ban ? autor.username : interaction.user.username].losingStreak = 0;			
			baza.users[!ban ? autor.username : interaction.user.username].winningStreak = 0;	
			baza.users[ban ? autor.username : interaction.user.username].galbenusuri += douagalbenusuri ? 2 : 1;
			baza.users[ban ? autor.username : interaction.user.username].proteina += douagalbenusuri ? 11 : 7;
			var embedAchievement = new EmbedBuilder().setTitle('acest embed a fost lăsat intenționat gol');
			if(baza.users[autor.username].achievements.omletteDuFromage == false)
			{
				if(baza.users[autor.username].losingStreak >= 4)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.omletteDuFromage.title)
					.setDescription(baza.achievements.omletteDuFromage.description);
					client.users.send(autor, 
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[autor.username].achievements.omletteDuFromage = true;
				}
			}
			if(baza.users[interaction.user.username].achievements.omletteDuFromage == false)
			{
				if(baza.users[interaction.user.username].losingStreak >= 4)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.omletteDuFromage.title)
					.setDescription(baza.achievements.omletteDuFromage.description);
					client.users.send(interaction.user,
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[interaction.user.username].achievements.omletteDuFromage = true;
				}
			}
			if(baza.users[autor.username].achievements.aiDatStramb == false)
			{
				if(baza.users[autor.username].losingStreak >= 3)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.aiDatStramb.title)
					.setDescription(baza.achievements.aiDatStramb.description);
					client.users.send(autor, 
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[autor.username].achievements.aiDatStramb = true;
				}
			}
			if(baza.users[interaction.user.username].achievements.aiDatStramb == false)
			{
				if(baza.users[interaction.user.username].losingStreak >= 3)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.aiDatStramb.title)
					.setDescription(baza.achievements.aiDatStramb.description);
					client.users.send(interaction.user,
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[interaction.user.username].achievements.aiDatStramb = true;
				}
			}
			if(baza.users[autor.username].achievements.tareInOua == false)
			{
				if(baza.users[autor.username].winningStreak >= 4)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.tareInOua.title)
					.setDescription(baza.achievements.tareInOua.description);
					client.users.send(autor, 
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[autor.username].achievements.tareInOua = true;
				}
			}
			if(baza.users[interaction.user.username].achievements.tareInOua == false)
			{
				if(baza.users[interaction.user.username].winningStreak >= 4)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.tareInOua.title)
					.setDescription(baza.achievements.tareInOua.description);
					client.users.send(interaction.user,
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[interaction.user.username].achievements.tareInOua = true;
				}
			}
			if(baza.users[autor.username].achievements.credCaEDeLemn == false)
			{
				if(baza.users[autor.username].winningStreak >= 5)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.credCaEDeLemn.title)
					.setDescription(baza.achievements.credCaEDeLemn.description);
					client.users.send(autor, 
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[autor.username].achievements.credCaEDeLemn = true;
				}
			}
			if(baza.users[interaction.user.username].achievements.credCaEDeLemn == false)
			{
				if(baza.users[interaction.user.username].winningStreak >= 5)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.credCaEDeLemn.title)
					.setDescription(baza.achievements.credCaEDeLemn.description);
					client.users.send(interaction.user,
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[interaction.user.username].achievements.credCaEDeLemn = true;
				}
			}
			if(baza.users[autor.username].achievements.undeSDoiPutereaCreste == false)
			{
				if(douagalbenusuri)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.undeSDoiPutereaCreste.title)
					.setDescription(baza.achievements.undeSDoiPutereaCreste.description);
					client.users.send(autor, 
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[autor.username].achievements.undeSDoiPutereaCreste = true;
				}
			}
			if(baza.users[interaction.user.username].achievements.undeSDoiPutereaCreste == false)
			{
				if(douagalbenusuri)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.undeSDoiPutereaCreste.title)
					.setDescription(baza.achievements.undeSDoiPutereaCreste.description);
					client.users.send(interaction.user,
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[interaction.user.username].achievements.undeSDoiPutereaCreste = true;
				}
			}
			//proteina
			if(baza.users[autor.username].achievements.proteina == false)
			{
				if(baza.users[autor.username].proteina >= 100)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.proteina.title)
					.setDescription(baza.achievements.proteina.description);
					client.users.send(autor, 
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[autor.username].achievements.proteina = true;
				}
			}
			if(baza.users[interaction.user.username].achievements.proteina == false)
			{
				if(baza.users[interaction.user.username].proteina >= 100)
				{
					embedAchievement = new EmbedBuilder()
					.setTitle(baza.achievements.proteina.title)
					.setDescription(baza.achievements.proteina.description);
					client.users.send(interaction.user,
						{
							embeds:[embedAchievement],
							content:`Achievement n**ou** !!`
						}

					);
					baza.users[interaction.user.username].achievements.proteina = true;
				}
			}
			
			fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "\t"));
		}
		console.log(`Nume autor: ${autor.username}. Nume interache: ${interaction.user.username}.`)	
	    await interaction.update({
            content: '',
            embeds: [embed],
            components: []
        });
    }
});