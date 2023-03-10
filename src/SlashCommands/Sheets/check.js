const { MessageEmbed } = require("discord.js");
const verifiedRoles = [
	'Congregation',
]
module.exports = {
	name: "check",
	description: "Checks the material, returns the current amount, goal, needed and price",
	//userPerms: ["USER"],
	options: [
		{
			name: "item",
			description: "The item to check",
			type: "STRING",
			required: true,
		}
	],
	run: async(client, interaction, args) => {
		const item = await interaction.options.getString("item");
		
		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "CraftBOT!A:E"
		});

		const data = rows.data.values.find(row => row[0].toLowerCase() === item.toLowerCase());

		if (data) {

			if (rows.data.values.length > 0) {

				const embed = new MessageEmbed()
				.setColor("GREEN")

				for(let i = 0; i < rows.data.values.length; i++) {
					const row = rows.data.values[i];
					if (row[0].toLowerCase() === item.toLowerCase()) {
						embed.setDescription(`item: ${row[0]}\n**Current:** ${row[1]} \n**Goal:** ${row[2]} \n**Needed:** ${row[3]}\n**Price:** ${row[4]}`);
					}
				}

				await interaction.reply({ embeds: [embed] })
			}

		} else if (!data) {
			return interaction.reply("item is not in the list!")
		}
	}
}