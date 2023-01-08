const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "update",
	description: "Checks if a user is in the list!",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "item",
			description: "The item to update",
			type: "STRING",
			required: true,
		},
        {
			name: "amount",
			description: "The new item amount",
			type: "STRING",
			required: true,
		},
        {
			name: "price",
			description: "The new item price",
			type: "STRING",
			required: true,
		}

	],
	run: async(client, interaction, args) => {
		const item = await interaction.options.getString("item");
		const amount = await interaction.options.getString("amount");
        const price = await interaction.options.getString("price");

		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "bottest!A:D"
		});

		const data = rows.data.values.find(row => row[0] === item);

		if (!data) {
			return interaction.reply("Item is not in the list!")
		} 

		let toDeleteRow;

		for (let i = 0; i < rows.data.values.length; i++) {
			const row = rows.data.values[i];
			if (row[0] === item) {
				toDeleteRow = i;
			}
		}
        //remove old value
		await client.googleSheets.batchUpdate({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			resource: {
					"requests": [
					{
						"deleteDimension": {
							"range": {
								"sheetId": 0,
								"dimension": "ROWS",
								"startIndex": toDeleteRow,
								"endIndex": toDeleteRow + 1,
							},
						}
					}
				]
			}
		}).catch(console.error)
        //add new values to sheet
        await client.googleSheets.values.append({
            auth: client.auth,
            spreadsheetId: client.sheetId,
            range: "bottest!A:D",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [item, amount, price]
                ]
            }
        });
        return interaction.reply(item + " Has been updated to Amount: " + amount + " Price: " + price)
	}
        
}