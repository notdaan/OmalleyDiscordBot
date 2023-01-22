const { MessageEmbed, Interaction } = require("discord.js");

module.exports = {
	name: "need",
	description: "Shows all items we need to buy!",
	//userPerms: ["USER"],
	options: null,
	
	run: async(client, interaction, args) => {
		const embed = new MessageEmbed()
		.setColor("RED")
		.setDescription("Items Needed:")
		
		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "CraftBOT!A:E",
		})
		if(rows.data.values.length > 0) {
			for(let i = 0; i < rows.data.values.length; i++) {
				const row = rows.data.values[i];
				if (parseFloat(row[3]) > 0) {
					embed.addField(`Item: ${row[0]}`, `**Current**: ${row[1]}\t**Goal**: ${row[2]}\t**Needed**: ${row[3]}\t**Price**: ${row[4]}`);
					//embed.addField(`Item: ${row[0]}`, `**Amount**: ${row[1]} \n**Price**: ${row[2]}\n**Total**: ${row[3]}`);
				}
			}
		} else {
			embed.setDescription("No items are needed! we are all good");
		}
		await interaction.reply({ embeds: [embed]})
	}
}

