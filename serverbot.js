const ngrok = require('./get_public_url');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const express = require('express');

const app = express();
app.use(express.json());



const botToken = '513924ee9b67e58b-5dd90bd61293e8da-b476d2526bc0e0e9';

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




const webhookUrl = "https://webhook.site/e9f0971e-c601-445c-b765-f661e8f23acd";
const port = process.env.PORT || 8080;

app.use('/viber/webhook', bot.middleware());

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${webhookUrl}/viber`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});

// const http = require('http');
// const port = process.env.PORT || 8080;

// return ngrok.getPublicUrl().then(publicUrl => {
//     console.log('Set the new webhook to"', publicUrl);
//     http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
// }).catch(error => {
//     console.log('Can not connect to ngrok server. Is it running?');
//     console.error(error);
// });