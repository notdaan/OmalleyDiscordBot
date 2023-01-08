const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "check",
	description: "Checks if a user is in the list!",
	userPerms: ["ADMINISTRATOR"],
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
			range: "bottest!A:D"
		});

		const data = rows.data.values.find(row => row[0] === item);

		if (data) {

			if (rows.data.values.length > 0) {

				const embed = new MessageEmbed()
				.setColor("GREEN")

				for(let i = 0; i < rows.data.values.length; i++) {
					const row = rows.data.values[i];
					if (row[0] === item) {
						embed.setDescription(`item: ${row[0]}\n**Amount:** ${row[1]} \n**Price:** ${row[2]} \n**Total:** ${row[3]}`);
					}
				}

				await interaction.reply({ embeds: [embed] })
			}

		} else if (!data) {
			return interaction.reply("item is not in the list!")
		}
	}
}