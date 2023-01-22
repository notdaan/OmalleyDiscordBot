const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "price",
	description: "calculates the price of x amount of y item",
	//userPerms: ["USER"],
	options: [
		{
			name: "item",
			description: "The item to check",
			type: "STRING",
			required: true,
		},
        {
			name: "amount",
			description: "how many?",
			type: "STRING",
			required: true,
		},

	],
	run: async(client, interaction, args) => {
		const item = await interaction.options.getString("item");
        const amount = await interaction.options.getString("amount");
		
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
                        let price = Number(row[4].replace(/[^0-9.-]+/g,""));
                        let total = (amount * price)
                        embed.setDescription('calculates the price of X amount of items')
						embed.addField(`Item: ${row[0]}`, `**Amount**: ${amount}\n**Price for Amount**: ${total}\n **Price Per Item**:${price}`);
					}
				}

				await interaction.reply({ embeds: [embed] })
			}

		} else if (!data) {
			return interaction.reply("item is not in the list!")
		}
	}
}