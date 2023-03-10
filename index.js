const chalk = require('chalk');
const fs = require("fs");
const { google } = require('googleapis');
const { Client, Collection, Intents, MessageEmbed, MessageFlags } = require("discord.js");
const { loadEvents } = require("./src/handlers/loadEvents");
const { loadSlashCommands } = require("./src/handlers/loadSlashCommands");
const { botToken, spreadsheetId, error_logs} = require("./src/jsons/config.json");

// Declaring our Discord Client
const client = new Client({
	allowedMentions: { parse: ["users", "roles"] },
	intents: [
	  Intents.FLAGS.GUILDS,
	  Intents.FLAGS.GUILD_MESSAGES,
	  Intents.FLAGS.GUILD_MEMBERS,
	  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	  Intents.FLAGS.GUILD_WEBHOOKS,
	  Intents.FLAGS.GUILD_VOICE_STATES,
	  Intents.FLAGS.GUILD_INVITES,
	  Intents.FLAGS.GUILD_BANS,
	  Intents.FLAGS.GUILD_PRESENCES,
	],
});

// Google Sheets Authorisation Stuff
const auth = new google.auth.GoogleAuth({
	keyFile: "src/jsons/credentials.json",
	scopes: "https://www.googleapis.com/auth/spreadsheets"
})
const sheetClient = auth.getClient();
const googleSheets = google.sheets({ version: "v4", auth: sheetClient });

// Stuff that will be very useful in our project
client.sheetCommands = fs.readdirSync("./src/SlashCommands/Sheets")
client.otherCommands = fs.readdirSync("./src/SlashCommands/OtherCommands")
client.slash = new Collection();
client.auth = auth;
client.sheetId = spreadsheetId;
client.googleSheets = googleSheets.spreadsheets;

// Declaring Slash Command and Events
loadEvents(client);
loadSlashCommands(client);

// Error Handling
process.on("uncaughtException", (err) => {
	console.log("Uncaught Exception: " + err);
  
	/* const exceptionembed = new MessageEmbed()
	.setTitle("Uncaught Exception")
	.setDescription(`${err}`)
	.setColor("RED")
	client.channels.cache.get(error_logs).send({ embeds: [exceptionembed] })
	console.log(err);
	console.log(exceptionembed) */
  });
  
process.on("unhandledRejection", (reason, promise) => {
	console.log(
	  "[FATAL] Possibly Unhandled Rejection at: Promise ",
	  promise,
	  " reason: ",
	  reason.message
	);
  
	 /* const rejectionembed = new MessageEmbed()
	.setTitle("Unhandled Promise Rejection")
	.addField("Promise", `${promise}`)
	.addField("Reason", `${reason.message}`)
	.setColor("RED")
	client.channels.cache.get(error_logs).send({ embeds: [rejectionembed] }) */
});
  
client.login(botToken).then(() => {
	console.log(
	  chalk.bgBlueBright.black(
		` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
	  )
	);
	client.user.setPresence({
		status: "idle",
		activities: [{
			type: 2,
			name: "Bill Screaming"
		}],
	
	});
});


client.on('messageCreate', async(message)=>{
	if(message.author.bot){
		return
	};
	console.log(message)

	if(message.content.includes("test")) {
		message.reply("recieved")
	}
	if(message.content.includes("sinners")) {
		message.reply("BLOODY MORONS")
	}
});