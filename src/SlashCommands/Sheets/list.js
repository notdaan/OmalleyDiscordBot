const { MessageEmbed, Interaction } = require("discord.js");

module.exports = {
	name: "list",
	description: "Shows all items we need to buy!",
	userPerms: ["ADMINISTRATOR"],
	options: null,
	
	run: async(client, interaction, args) => {
		const embed = new MessageEmbed()
		.setColor("RED")
		.setDescription("Items Needed:")
		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: "1bG5mHlKuCwnoHuR24zI1LqIjCVib_k2isJxJnUYE99k",
			range: "bottest!A3:D",
		})
		if(rows.data.values.length > 0) {
			for(let i = 0; i < rows.data.values.length; i++) {
				const row = rows.data.values[i];
				embed.addField(`Item: ${row[0]}`, `**Amount**: ${row[1]}\t**Price**: ${row[2]}\t**Total**: ${row[3]}`);
				//embed.addField(`Item: ${row[0]}`, `**Amount**: ${row[1]} \n**Price**: ${row[2]}\n**Total**: ${row[3]}`);
			}
		} else {
			embed.setDescription("No items are needed! we are all good");
		}
		await interaction.reply({ embeds: [embed] })
	}
}

