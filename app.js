const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const express = require('express');


// Replace 'YOUR_VIBER_BOT_TOKEN' with your actual Viber bot token
const botToken = '516ca24ed6e7e310-335bb7cf88a509ee-e8bb9cfd892c1fae';

const bot = new ViberBot({
    authToken: botToken,
    name: 'MyViberBot',
    avatar: 'URL_К_ВАШЕЙ_АВАТАРКЕ_БОТА',
  });

  console.log(bot);
  
  // Обработчик события нового сообщения
  bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    console.log('Message');
    // Отвечаем на каждое сообщение пользователя текстом "Привет!"
    response.send(new TextMessage('Привет!'));
  });
  
  // Запускаем Express сервер
  const app = express();
  app.use(express.json());
  
  // Обработчик входящих запросов на путь /webhook
  app.post('/webhook', bot.middleware());
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Бот слушает порт ${port}`);
    
    // Устанавливаем вебхуки после того, как сервер запущен и прослушивает порт
    bot.setWebhook('https://webhook.site/9318cee9-1f68-4307-bb27-dde9e6797997').catch((error) => {
      console.error('Ошибка установки вебхука:', error);
    });
  });
  