var fs = require('fs');
const { InteractionContextType, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('skin').setDescription('Schimbă skin-ul').addStringOption((option) => option.setName('skin').setDescription('Care skin').setRequired(true)),
	async execute(interaction) {
		const baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));

    await interaction.reply({content: 'skin test'});
	},
};