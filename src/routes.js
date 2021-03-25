const express = require('express');
const router = express.Router();
const {
	chats,
	store,
	show,
	findInformations,
} = require('./controllers/groupController');

router.get('/', (request, response) => {
	return response.send('GruposTelegram...')
});

router.get('/chats', chats);
router.post('/groups', store);
router.get('/groups/show', show)
router.get('/groups/find-informations', findInformations);

module.exports = app => app.use(router);
