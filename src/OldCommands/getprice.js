const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "getpriceold",
	description: "returns the price of x items",
	userPerms: ["ADMINISTRATOR"],
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
                        //console.log(row[2])
                        //console.log(typeof row[2])
                        let price = Number(row[2].replace(/[^0-9.-]+/g,""));
                        //console.log(price)
                        let total = (amount * price)
                        //console.log(total)
                        embed.setDescription('calculates the price of x amount of items')
						embed.addField(`Item: ${row[0]}`, `**Amount**: ${amount}\n**Price for Amount**: ${total}`);
					}
				}

				await interaction.reply({ embeds: [embed] })
			}

		} else if (!data) {
			return interaction.reply("item is not in the list!")
		}
	}
}