require('dotenv').config()
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const horizon = require('horizon-youtube-mp3')
const path = require('path')
const fs = require('fs')

const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
])

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Hello'))
bot.help((ctx) => ctx.reply('Help message'))
bot.on('message', function (ctx) {
    console.log(ctx.message);
    horizon.getInfo(ctx.message.text, function(err, e){

        console.log(e.videoName);

        var downloadPath = path.join(__dirname);

        horizon.downloadToLocal(
            ctx.message.text,
            downloadPath,
            e.videoName + ".mp3",
            null,
            null,
            onConvertVideoComplete,
            onConvertVideoProgress
        );

        function onConvertVideoComplete(err, result) {
            console.log(err, result);
            console.log(downloadPath + '/' + e.videoName + ".mp3");
            ctx.replyWithAudio({ source: downloadPath + '/' + e.videoName + ".mp3" });
        }

        function onConvertVideoProgress(percent, timemark, targetSize) {
            console.log('Progress:', percent, 'Timemark:', timemark, 'Target Size:', targetSize);
        }
    });
});
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.launch();
