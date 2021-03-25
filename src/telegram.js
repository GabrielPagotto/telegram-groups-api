require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const { BOT_TOKEN, MASTER_USER } = process.env;
const botToken = BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

module.exports = { bot, masterUser: MASTER_USER };
