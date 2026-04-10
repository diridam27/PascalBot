var fs = require('fs');
const {EmbedBuilder, InteractionContextType, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('hristosainviat').setDescription('Ciocnește un ou'),
	async execute(interaction) {
		const baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
		zar = Math.floor(Math.random() * 4);

		const embed = new EmbedBuilder()
	    .setAuthor({
	      name: interaction.user.username,
	      iconURL: interaction.user.displayAvatarURL(),
	    })
		.setTitle(`Hristos a înviat!`)
		
		.setDescription(`${baza.emoaje[baza.users[interaction.user.username].skin].tot.sus[0]}${baza.emoaje[baza.users[interaction.user.username].skin].tot.sus[1]}\n${baza.emoaje[baza.users[interaction.user.username].skin].tot.sus[2]}${baza.emoaje[baza.users[interaction.user.username].skin].tot.sus[3]}`);
		
		const aaiButton = new ButtonBuilder().setCustomId('aai_' + interaction.user).setLabel('Adevărat a înviat').setStyle(ButtonStyle.Danger);
		const row = new ActionRowBuilder().addComponents(aaiButton);
		await interaction.reply({ embeds: [embed], components:[row],});
	},
};