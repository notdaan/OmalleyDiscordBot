module.exports = {
	name: "newmaterial",
	description: "Adds a new item to the spreadsheet! - do not use, under construction",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "item",
			description: "The item we want",
			type: "STRING",
			required: true,
		},
		{
			name: "current",
			description: "How many do we have?",
			type: "STRING",
			required: true,
		},
		{
			name: "goal",
			description: "How many do we want",
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
		const current = await interaction.options.getString("current");
		const goal = await interaction.options.getString("goal");
		const price = await interaction.options.getString("price")
		return interaction.reply("under construction")
		/* const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "CraftBOT!A:A"
		});

		const data = rows.data.values.find(row => row[0] === item);

		if (data) {
			return interaction.reply("Item has been added to the list already! use /update or /remove")
		} else if (!data) {
			await client.googleSheets.values.append({
				auth: client.auth,
				spreadsheetId: client.sheetId,
				range: "CraftBOT!A:G",
				valueInputOption: "USER_ENTERED",
				resource: {
					values: [
						[item, current, goal, price]
					]
				}
			});
	
			return interaction.reply("**" + goal + " " + item + "** added at **" + price + "** each")
		} */
	}
}
