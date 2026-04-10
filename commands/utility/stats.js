var fs = require('fs');
const {EmbedBuilder, InteractionContextType, SlashCommandBuilder } = require('discord.js');

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
	data: new SlashCommandBuilder().setName('stats').setDescription('Verific['),
	async execute(interaction) {
		const baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
		zar = Math.floor(Math.random() * 4);
		
		var matrice = ["", "", "", "", "", ""];
		var avutie = 0;

		for(i = 0; i < skinuri.length; i++)
		{
			if(baza.users[interaction.user.username].skinuri[skinuri[i]] > 0)
			{
				if(avutie < 3)
				{
					matrice[0] = matrice[0] + baza.emoaje[skinuri[i]].tot.jos[0] + baza.emoaje[skinuri[i]].tot.jos[1] + '\`   \`';
					matrice[1] = matrice[1] + baza.emoaje[skinuri[i]].tot.jos[2] + baza.emoaje[skinuri[i]].tot.jos[3] + `\`x${baza.users[interaction.user.username].skinuri[skinuri[i]]} \``; 
				}
				if(avutie >= 3 && avutie < 6)
				{
					matrice[2] = matrice[2] + baza.emoaje[skinuri[i]].tot.jos[0] + baza.emoaje[skinuri[i]].tot.jos[1] + '\`   \`';
					matrice[3] = matrice[3] + baza.emoaje[skinuri[i]].tot.jos[2] + baza.emoaje[skinuri[i]].tot.jos[3] + `\`x${baza.users[interaction.user.username].skinuri[skinuri[i]]} \``; 
				}
				if(avutie >= 6)
				{
					matrice[4] = matrice[4] + baza.emoaje[skinuri[i]].tot.jos[0] + baza.emoaje[skinuri[i]].tot.jos[1] + '\`   \`';
					matrice[5] = matrice[5] + baza.emoaje[skinuri[i]].tot.jos[2] + baza.emoaje[skinuri[i]].tot.jos[3] + `\`x${baza.users[interaction.user.username].skinuri[skinuri[i]]} \``; 
				}
				avutie++;
			}
		}

		const embed = new EmbedBuilder()
	    .setAuthor({
	      name: interaction.user.username,
	      iconURL: interaction.user.displayAvatarURL(),
	    })
		.setTitle(`Statistici`)
        .setDescription(`Gălbenușuri: ${baza.users[interaction.user.username].galbenusuri}\nProteină: ${baza.users[interaction.user.username].proteina}g\nSkinuri:\n${matrice[0]}\n${matrice[1]}${avutie >3 ? '\n' : ''}${matrice[2]}${avutie >3 ? '\n' : ''}${matrice[3]}${avutie > 6 ? '\n' : ''}${matrice[4]}${avutie > 6 ? '\n' : ''}${matrice[5]}`)

		await interaction.reply({ embeds: [embed]});
	},
};