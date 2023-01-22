const { MessageEmbed, Interaction } = require("discord.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
	name: "quote",
	description: "gets a random bible quote",
	//userPerms: ["USER"],
	options: null,
	
	run: async(client, interaction, args) => {
		const embed = new MessageEmbed()
		.setColor("BLUE")
		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: "1bG5mHlKuCwnoHuR24zI1LqIjCVib_k2isJxJnUYE99k",
			range: "quotes!A2:B",
		})
		if(rows.data.values.length > 0) {  
            let i = getRandomInt(rows.data.values.length)
			//for(let i = 0; i < rows.data.values.length; i++) {
			const row = rows.data.values[i];
			embed.addField(`**${row[1]}**`, `*${row[0]}*`);
		} else {
			embed.setDescription("No quote for you");
		}
		await interaction.reply({ embeds: [embed] })
	}
}