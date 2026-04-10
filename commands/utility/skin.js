var fs = require('fs');
const { InteractionContextType, SlashCommandBuilder } = require('discord.js');

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

module.exports = {
	data: new SlashCommandBuilder().setName('skin').setDescription('Schimbă skin-ul').addStringOption((option) => option.setName('skin').setDescription('Care skin').setRequired(true)),
	async execute(interaction) {
		const baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
	if(skinuri.includes(interaction.options.getString('skin').toLowerCase()))
	{
		if(baza.users[interaction.user.username].skinuri[interaction.options.getString('skin').toLowerCase()] > 0)
		{
			baza.users[interaction.user.username].skin = interaction.options.getString('skin').toLowerCase();
			await interaction.reply({content: `Skin-ul tău e acum ${interaction.options.getString('skin')}.`});
			fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "\t"));
		}
		else
		{
			await interaction.reply({content: `Nu ai skin-ul ${interaction.options.getString('skin')}. Îl poți câștiga de la <#1492133117023096883> sau făcând troc cu alții.`});
		}
	}
	else
	{
		await interaction.reply({content: `Skin-ul ${interaction.options.getString('skin')} nu există.`});
	}
	},
};