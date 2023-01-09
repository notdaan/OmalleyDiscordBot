const { MessageEmbed, Interaction } = require("discord.js");

module.exports = {
	name: "removeall",
	description: "Removes a item from the sheet!",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "y/n",
			description: "removes all items from the buy list",
			type: "STRING",
			required: true
		}
	],
	run: async(client, interaction, args) => {
		const item = await interaction.options.getString("y/n");
        console.log(item)
        if (item === 'y') {
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
                                    "startIndex": 1,
                                    "endIndex": 99,
                                },
                            }
                        }
                    ]
                }
            }).catch(console.error)
            return interaction.reply("All Items have been removed from the list!")
        } else {
            return interaction.reply("Didnt Change a thing")
        }
		
	}
}