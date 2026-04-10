var fs = require('fs');
const { EmbedBuilder, InteractionContextType, SlashCommandBuilder, escapeSpoiler } = require('discord.js');
const skin = require('./skin');

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

const plura = [
    "Skin nou!",
    "Dublură!!",
    "Triplură!!!",
    "Cvadruplură!!!!",
    "Cvintuplură!!!!!",
    "Sextuplură!!!!!!",
    "Septuplură!!!!!!!",
    "Octuplură!!!!!!!!",
    "Nonuplură!!!!!!!!!",
    "Decuplură!!!!!!!!!!",
    "Undecuplură!!!!!!!!!!!",
    "Duodecuplură!!!!!!!!!!!!",
    "Treisprezeceuplură!!!!!!!!!!!!!",
    "Paisprezeceuplură!!!!!!!!!!!!!!!!",
    "Cincisprezeceuplură!!!!!!!!!!!!!!",
    "Șaisprezeceuplură!!!!!!!!!!!!!!!",
    "Șaptesprezeceuplură!!!!!!!!!!!!!!!!",
    "Optsprezeceuplură!!!!!!!!!!!!!!!!!",
    "Nouăsprezeceuplură!!!!!!!!!!!!!!!!!!",
    "Douăzeciuplură!!!!!!!!!!!!!!!!!!!!!!"
]

const tcg = 
{
    rosu: {
        titlu: "Roșu",
        descriere: "Oul clasic de paște, culoarea roșie simbolizează culoarea sângelui Mântuitorului Iisus Hristos",
        origine: ":red_circle:"
    },
	batik: {
        titlu: "Batik",
        descriere: "Ou pictat cu tehnica batik, folosind ceară topită - Motiv clasic al sorbilor.",
        origine: "<:sorbs:1492189647642820718>"
    },
	rusia: {
        titlu: "Rusia",
        descriere: "Ou de paște din Rusia. Acesta are aplicat termic un autocolant cu motive florale.",
        origine: ":flag_ru:"
    },
	grecia: {
        titlu: "Grecia",
        descriere: "Ou pictat din grecia cu un model simetric, colorat",
        origine: ":flag_gr:"
    },
	suceava: {
        titlu: "Suceava",
        descriere: "Ou încondeiat din Ulma-Suceava, de la expoziția „Ouă încondeiate” din Iași din 2021",
        origine: ":flag_ro:"
    },
	ucraina: {
        titlu: "Ucraina",
        descriere: "Ou pictat din Ucraina cu un model ce reprezintă niște flori ale soarelui",
        origine: ":flag_ua:"
    },
	viena: {
        titlu: "Viena",
        descriere: "Ou colorat din Viena. Are pe el desenată o albină",
        origine: ":flag_at:"
    },
	washi: {
        titlu: "Washi",
        descriere: "Ou de paște japonez decorat cu ajutorul hârtiei de orez washi",
        origine: ":flag_jp:"
    }
}

module.exports = {
	data: new SlashCommandBuilder().setName('gacha').setDescription('Încearcă-ți norocul pentru a câștiga un skin random!'),
	async execute(interaction) {
	const baza = JSON.parse(fs.readFileSync('./baza.json', 'utf8'));
    if(baza.users[interaction.user.username].galbenusuri >= 5)
    {
        var win = skinuri[Math.floor(Math.random() * 8)];
        const embed = new EmbedBuilder()
        .setTitle(plura[baza.users[interaction.user.username].skinuri[win]])
        .setDescription(`${baza.emoaje[win].tot.jos[0]}${baza.emoaje[win].tot.jos[1]}  **${tcg[win].titlu}**\n${baza.emoaje[win].tot.jos[2]}${baza.emoaje[win].tot.jos[3]}  ${tcg[win].descriere}\n\n${tcg[win].origine}`);
        baza.users[interaction.user.username].galbenusuri -= 5;
        baza.users[interaction.user.username].skinuri[win] += 1;
        fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "\t"));
        await interaction.reply({ content: '', embeds: [embed]});
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
                interaction.user.send(
                    {
                        embeds:[embedAchievement],
                        content:`Achievement n**ou** !!`
                    }
                );
                baza.users[interaction.user.username].achievements.dacaNuMaGasestiLaLapte = true;
                fs.writeFileSync('./baza.json', JSON.stringify(baza, null, "\t"));
            }
        }
    }
    else
    {
        await interaction.reply({ content: `Să joci la gacha machine costă 5 gălbenușuri. Scuze, ${interaction.user.username}, dar nu dau pe caiet. Vino înapoi când ai mai multă valută.`});
    }
	},
};