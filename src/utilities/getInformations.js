const axios = require('axios');
const Jsdom = require('jsdom');
const { JSDOM } = Jsdom

module.exports = {
	get: async function(link) {
		const informations = await axios.get(link);
		const document  = new JSDOM(informations.data).window.document;
		const exists = document.querySelector('.tgme_page_photo') !== null;
		let description = document.querySelector('.tgme_page_description');

		if (description === null) return ({ exists });

		description = description.innerHTML;

		if (!exists && description === '') return ({ exists });

		const title = document.querySelector('[property="og:title"]').content;
		const icon = document.querySelector('[property="og:image"]').content;
		const isChannel = true;

		let getMembers = document.querySelector('.tgme_page_extra');

		if (getMembers === null) return ({ exists });
		
		getMembers = getMembers.innerHTML;

		let membersString = getMembers.split(' members');
		
		membersString = membersString[0];
		membersString = membersString.split(' ');
		
		let members = '';
		
		membersString.map(number => {
			members = members + number;
		});
		
		members = parseInt(members);
		
		return ({ exists, title, description, icon, link, isChannel, members });
	},
}
