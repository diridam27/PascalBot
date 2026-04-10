var fs = require('fs');
const {EmbedBuilder, InteractionContextType, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

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
	data: new SlashCommandBuilder().setName('troc').setDescription('Fă schimb cu cineva').addStringOption((option) => option.setName('vreau').setDescription('Ce skin vrei?').setRequired(true)).addStringOption((option) => option.setName('dau').setDescription('Ce dai la schimb?').setRequired(true)),
	async execute(interaction) {
		const baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
		var embed = new EmbedBuilder().setTitle('Acest embed a fost lăsat intenționat gol');

        const acceptButton = new ButtonBuilder().setCustomId('accept_' + interaction.user + '_' + interaction.options.getString('vreau') + '_' +interaction.options.getString('dau')).setLabel('Accept').setStyle(ButtonStyle.Success);
		const row = new ActionRowBuilder().addComponents(acceptButton);

        if(baza.users[interaction.user.username].skinuri[interaction.options.getString('dau')] > 0)
        {
            if(skinuri.includes(interaction.options.getString('vreau')))
            {
                embed = new EmbedBuilder()
                .setTitle(`Ofertă de schimb!`)
                .setDescription(`## Dau: \n${baza.emoaje[interaction.options.getString('dau')].tot.jos[0]}${baza.emoaje[interaction.options.getString('dau')].tot.jos[1]}\n${baza.emoaje[interaction.options.getString('dau')].tot.jos[2]}${baza.emoaje[interaction.options.getString('dau')].tot.jos[3]}\n## Vreau:\n${baza.emoaje[interaction.options.getString('vreau')].tot.jos[0]}${baza.emoaje[interaction.options.getString('vreau')].tot.jos[1]}\n${baza.emoaje[interaction.options.getString('vreau')].tot.jos[2]}${baza.emoaje[interaction.options.getString('vreau')].tot.jos[3]}`)                
            }
            else
            {
                embed = new EmbedBuilder()
                .setTitle(`Îmi ceri imposibilul!`)
                .setDescription(`Skin-ul ${interaction.options.getString('vreau')} nu există.`)
            }
        }
        else
        {
            embed = new EmbedBuilder()
            .setTitle(`Nu promite ce nu poți oferi!`)
            .setDescription(`Nu ai niciun ou ${interaction.options.getString('dau')} în colecție.`)
        }
		await interaction.reply({ embeds: [embed], components: baza.users[interaction.user.username].skinuri[interaction.options.getString('dau')] > 0 && skinuri.includes(interaction.options.getString('vreau')) ? [row] : [],});
	},
};