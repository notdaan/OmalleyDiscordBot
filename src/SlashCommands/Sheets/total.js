const { MessageEmbed, Interaction } = require("discord.js");

module.exports = {
	name: "total",
	description: "Gets the value of all items needed to buy!",
	userPerms: ["ADMINISTRATOR"],
	options: null,
	
	run: async(client, interaction, args) => {
		const embed = new MessageEmbed()
		.setColor("RED")
		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: "1bG5mHlKuCwnoHuR24zI1LqIjCVib_k2isJxJnUYE99k",
			range: "bottest!F3",
		})
		if(rows.data.values.length > 0) {
            let total = 0
			for(let i = 0; i < rows.data.values.length; i++) {
				const row = rows.data.values[i];
                console.log(row[0])
                total = row[0]
			}
            embed.addField(`**Total Cash Needed:**:`, `$${total}`) 
		} else {
			embed.setDescription("No items are needed! we are all good");
		}
		await interaction.reply({ embeds: [embed] })
	}
}
