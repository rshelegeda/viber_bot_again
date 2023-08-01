// const ViberBot = require('viber-bot').Bot;
// const BotEvents = require('viber-bot').Events;
// const TextMessage = require('viber-bot').Message.Text;
// const express = require('express');


// // Replace 'YOUR_VIBER_BOT_TOKEN' with your actual Viber bot token
// const botToken = '516ca24ed6e7e310-335bb7cf88a509ee-e8bb9cfd892c1fae';

// const bot = new ViberBot({
//     authToken: botToken,
//     name: 'MyViberBot',
//     avatar: 'URL_К_ВАШЕЙ_АВАТАРКЕ_БОТА',
//   });

//   console.log(bot);
  
//   // Обработчик события нового сообщения
//   bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
//     console.log('Message');
//     // Отвечаем на каждое сообщение пользователя текстом "Привет!"
//     response.send(new TextMessage('Привет!'));
//   });
  
//   // Запускаем Express сервер
//   const app = express();
//   app.use(express.json());
  
//   // Обработчик входящих запросов на путь /webhook
//   app.post('/webhook', bot.middleware());
  
//   const port = 3000;
//   app.listen(port, () => {
//     console.log(`Бот слушает порт ${port}`);
    
//     // Устанавливаем вебхуки после того, как сервер запущен и прослушивает порт
//     bot.setWebhook('https://webhook.site/9318cee9-1f68-4307-bb27-dde9e6797997').catch((error) => {
//       console.error('Ошибка установки вебхука:', error);
//     });
//   });
  


'use strict';


const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');

const app = express();
app.use(express.json());

const bot = new ViberBot({
    authToken: '516ca24ed6e7e310-335bb7cf88a509ee-e8bb9cfd892c1fae',
    name: "Override API",
    avatar: "https://cdn3.iconfinder.com/data/icons/customer-support-7/32/40_robot_bot_customer_help_support_automatic_reply-512.png" // It is recommended to be 720x720, and no more than 100kb.
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});


// Wasn't that easy? Let's create HTTPS server and set the webhook:

const port = process.env.PORT || 3000;

// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = "https://webhook.site/9318cee9-1f68-4307-bb27-dde9e6797997";


app.use('/viber/webhook', bot.middleware());

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${webhookUrl}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});