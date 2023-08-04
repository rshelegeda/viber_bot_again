const ngrok = require('./get_public_url');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const express = require('express');

const app = express();
app.use(express.json());



const botToken = '516ca24ed6e7e310-335bb7cf88a509ee-e8bb9cfd892c1fae';

const bot = new ViberBot({
    authToken: botToken,
    name: 'MyViberBot',
    avatar: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
});

// Обработчик события нового сообщения
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    console.log('Message');
    // Отвечаем на каждое сообщение пользователя текстом "Привет!"
    response.send(new TextMessage('Привет!'));
});


const http = require('http');
const port = process.env.PORT || 8080;

return ngrok.getPublicUrl().then(publicUrl => {
    console.log('Set the new webhook to"', publicUrl);
    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
}).catch(error => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
});