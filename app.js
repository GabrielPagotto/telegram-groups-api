const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const upgrader = require('./src/utilities/upgrader');
const schedule = require('node-schedule');
const { bot } = require('./src/telegram');

schedule.scheduleJob('0 */1 * * *', () => upgrader());

require('dotenv').config();
require('./src/database');

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./src/routes')(app);

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
	const botRunning = bot.options.polling;

	botRunning ? console.log('Telegram bot is running') : console.log('Telegram bot is not running')
});
