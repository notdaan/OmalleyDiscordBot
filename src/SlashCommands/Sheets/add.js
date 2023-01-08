module.exports = {
	name: "add",
	description: "Adds a item to the spreadsheet!",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "item",
			description: "The item we want",
			type: "STRING",
			required: true,
		},
		{
			name: "amount",
			description: "How many do we want?",
			type: "STRING",
			required: true,
		},
		{
			name: "price",
			description: "The price we wish to pay for the item",
			type: "STRING",
			required: true,
		}
	],
	run: async(client, interaction, args) => {
		const item = await interaction.options.getString("item");
		const amount = await interaction.options.getString("amount");
		const price = await interaction.options.getString("price")

		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "bottest!A:A"
		});

		const data = rows.data.values.find(row => row[0] === item);

		if (data) {
			return interaction.reply("Item has been added to the list already!")
		} else if (!data) {
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
	
			return interaction.reply("The Item has been added to the list!")
		}
	}
}