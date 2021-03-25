const Group = require('../models/Group');
const Category = require('../models/Category');
const paginate = require('../utilities/paginate');
const getInformations = require('../utilities/getInformations');
const dater = require('../utilities/dater');

module.exports = {
	chats: async function(request, response) {
		let chats = await Group.findAll({
			where: {
				disabled: false,
			},
			include: {
				association: 'category',
			},
		});

		chats =  chats.reverse();

		return response.json(chats);
	},
	index: async function(request, response) {
		let groups = await Group.findAll({
			where: {
				disabled: false,
			},
			include: {
				association: 'category',
			},
		});

		groups = paginate({ list: groups.reverse(), totalForPage: 6 });

		return response.json(groups);
	},
	store: async function(request, response) {
		const data = request.body;

		const exist = await Group.findOne({
			where: { url: data.url },
		});

		if (exist !== null) return response.status(406).json({ error: 'This chat already exists' });

		const informations = await getInformations.get(data.url);

		if (informations.title !== data.title && informations.description !== data.description) {
			return response.status(406).json({ error: 'You are trying to send a chat that is already registered' });
		}

		if (data.url.split('joinchat/').length > 1) {
			data.stringId = data.url.split('joinchat/')[1];
		} else {
			data.stringId = data.url.split('.me/')[1];
		}

		const group = await Group.create(data);

		return response.json(group);
	},
	show: async function(request, response) {
		const { stringId } = request.query;
		const group = await Group.findOne({ where: { stringId, disabled: false }, include: { association: 'category' }});

		group.views = group.views + 1;
		group.save();

		const time = dater.difference(group.createdAt);
		const allGroups = await Group.findAll({
			include: {
				association: 'category',
			},
		});
		
		return response.json({ status: 'okay' });
	},
	findInformations: async (request, response) => {
		const url = request.query.link;

		try {
			if (url.split('.me/').length === 1) return response.status(405).json({ error: 'Invalid url' });

			const informations = await getInformations.get(url);

			const { exists } = informations;

			if (!exists) return response.status(404).json({ error: `This chat doens't exists` });
			
			return response.json(informations);
		} catch (error) {
			return response.status(405).json({ error: 'Invalid url' });
		}
	},
	groupsByCategory: async function(request, response) {
		let { id } = request.query;

		let groups = await Group.findAll({
			include: {
				association: 'category',
			},
			where: {
				categoryId: id,
				disabled: false,
			},
		});

		groups = paginate({ list: groups.reverse(), totalForPage: 6 });

		return response.json(groups);
	},
	categories: async function(request, response) {
		const categories = await Category.findAll();

		return response.json(categories);
	},
	addCategory: async function(request, response) {
		const categories = require('../utilities/categories');
		
		categories.map(async (data) => {
			await Category.create(data);
		});

		return response.json({ status: 'okay' });
	},
};
