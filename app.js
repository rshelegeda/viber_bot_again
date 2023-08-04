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

// Запускаем Express сервер

// Обработчик входящих запросов на путь /webhook
app.post('/webhook', bot.middleware());

app.post('/sendData', (req, res)=>{
    return res.send('Hello from POST');
})

app.get('/getData', (req, res) => {
    return res.send('Hello from GET');
});

const port = 8080;
app.listen(port, () => {
    console.log(`Бот слушает порт ${port}`);

    // Устанавливаем вебхуки после того, как сервер запущен и прослушивает порт
    const webhookUrl = 'http://91.206.179.119:8080';
    bot.setWebhook(webhookUrl).catch((error) => {
        console.error('Ошибка установки вебхука:', error);
    });
});