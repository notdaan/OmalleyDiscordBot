const { MessageEmbed, Interaction } = require("discord.js");
const verifiedRoles = [
	'Congregation',
]
module.exports = {
	name: "totalcost",
	description: "Gets the value of all items needed to buy",
	//userPerms: ["USER"],
	options: null,
	
	run: async(client, interaction, args) => {
		const embed = new MessageEmbed()
		.setColor("RED")
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
				range: "CraftBOT!L3"
			})
			if(rows.data.values.length > 0) {
        	    let total = 0
				for(let i = 0; i < rows.data.values.length; i++) {
					const row = rows.data.values[i];
        	        //console.log(row[0])
        	        total = row[0]
				}
        	    embed.addField(`**Total cash needed to buy everything:**:`, `${total}`) 
			} else {
				embed.setDescription("No items are needed! we are all good");
			}
			await interaction.reply({ embeds: [embed] })
		}
	}
}
