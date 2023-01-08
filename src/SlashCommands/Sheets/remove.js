module.exports = {
	name: "remove",
	description: "Removes a user from the sheet!",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "item",
			description: "Removes a item form the sheet!",
			type: "USER",
			required: true
		}
	],
	run: async(client, interaction, args) => {
		const item = await interaction.options.getString("item");
	
		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "bottest!A:A"
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

		return interaction.reply("Item has been removed from the list!")
	}
}