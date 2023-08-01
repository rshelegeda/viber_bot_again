const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const express = require('express');


// Replace 'YOUR_VIBER_BOT_TOKEN' with your actual Viber bot token
const botToken = '513924ee9b67e58b-5dd90bd61293e8da-b476d2526bc0e0e9';

const bot = new ViberBot({
    authToken: botToken,
    name: 'MyViberBot',
    avatar: 'URL_К_ВАШЕЙ_АВАТАРКЕ_БОТА',
  });
  
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
    bot.setWebhook('https://webhook.site/db1e4d01-55c1-4021-93ef-e6fcb7f97ba9').catch((error) => {
      console.error('Ошибка установки вебхука:', error);
    });
  });
  