const { MessageEmbed } = require("discord.js");
const verifiedRoles = [
	'Congregation',
]
module.exports = {
	name: "sub",
	description: "removes material that has been used from the list. ",
	//userPerms: ["USER"],
	options: [
		{
			name: "item",
			description: "The item you bought",
			type: "STRING",
			required: true,
		},
        {
			name: "amount",
			description: "how many did you buy?",
			type: "STRING",
			required: true,
		},
	],
	run: async(client, interaction, args) => {
		const item = await interaction.options.getString("item");
		const amount = await interaction.options.getString("amount");
		const charName = interaction.member.nickname;
		let newAmount = 0
		let oldAmount = 0
		let validRoleForCommand = false
		
		for (let i = 0; i < verifiedRoles.length; i++) {
			if(interaction.member.roles.cache.some(role => role.name === verifiedRoles[i])){
				validRoleForCommand = true
			}
		};

		if (validRoleForCommand === true) {
			const rows = await client.googleSheets.values.get({
				auth: client.auth,
				spreadsheetId: client.sheetId,
				range: "CraftBOT!A:E"
			});

			const data = rows.data.values.find(row => row[0].toLowerCase() === item.toLowerCase());

			if (!data) {
				return interaction.reply("Item is not in the list!")
			} 
			let appRange = ""
			for (let i = 0; i < rows.data.values.length; i++) {
				const row = rows.data.values[i];
				if (row[0].toLowerCase() === item.toLowerCase()) {
					appRange =	"CraftBOT!B" + (i + 1)
					oldAmount = parseFloat(row[1])
					newAmount = parseFloat(row[1]) - parseFloat(amount)
				}
			}
			console.log(appRange)
        	await client.googleSheets.values.update({
        	    auth: client.auth,
        	    spreadsheetId: client.sheetId,
        	    range: appRange,
        	    valueInputOption: "USER_ENTERED",
        	    resource: {
        	        values: [
        	            [newAmount]
        	        ]
        	    }
        	});

			let date = Date()
			await client.googleSheets.values.append({
        	    auth: client.auth,
        	    spreadsheetId: client.sheetId,
        	    range: "MaterialLedger!A:F",
        	    valueInputOption: "USER_ENTERED",
        	    resource: {
        	        values: [
        	            [charName, item,"used","-"+amount, 0, 0, date]
        	        ]
        	    }
        	});

        	return interaction.reply(charName + " ** Used " + item + "** we had: " + oldAmount + " we now have **Total Amount: **" + newAmount)
		}
		return interaction.reply(charName + " Does not have the correct role for this command.")
	}
}