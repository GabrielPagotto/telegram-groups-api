const Group = require('../models/Group');
const getInformations = require('./getInformations');
const { bot, masterUser } = require('../telegram');

let lastProgress;

module.exports = async function() {
	const message = await bot.sendMessage(masterUser, 'A atualização de chats começou!');
	const chats = await Group.findAll({ where: { disabled: false }});
	let totalChats = 0, updatedChats = 0, deletedChats = 0;

	for (totalChats; totalChats < chats.length; totalChats++) {
		const chat = [chats[totalChats]][0];
		const informations = await getInformations.get(chat.url);
		const { exists } = informations;
		const progressInt = parseInt((totalChats / chats.length) * 100);
		const progress = progressInt;
			
		if (!exists) {
			await chatControl.disable(chat);

			deletedChats++;
		} else {
			await chatControl.update(chat, informations);
			updatedChats++;	
		}
		sendProgress(progress, message)
	}
	const respFinalText = `
	Chats atualizados!
Total: ${totalChats}
Atualizados: ${updatedChats}
Deletados: ${deletedChats}
	`;

	return bot.editMessageText(
		respFinalText, {
			chat_id: masterUser,
			message_id: message.message_id,
		}
	);
}

const chatControl = {
	update: async function(chat, informations) {
		const { title, description, icon, isChannel, members } = informations;
		
		chat.title = title;
		chat.description = description;
		chat.icon = icon;
		chat.isChannel = isChannel;
		chat.members = members;

		console.log(`The chat ${chat.title} has been updated`);

		await chat.save();
	},
	disable: async function(chat) {
		chat.disabled = true;
		console.log(`The chat ${chat.title} has been deleted`);
		await chat.save();
	},
};

function sendProgress(progress, message) {	
	let altered = lastProgress != progress;
	lastProgress = progress;

	const textRespPro = `
Atualizando chats...
Progresso: ${progress}%
	`;

	if (altered) {
		bot.editMessageText(
			textRespPro, {
				chat_id: masterUser,
				message_id: message.message_id,
			}
		);
		altered = false;
	}
}
