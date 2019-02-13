require('dotenv').config()
const Telegraf = require('telegraf')
const youtubeConvertor = require('../youtube/localYoutubeDownloader')
const path = require('path')
const fs = require('fs')

const bot = new Telegraf(process.env.BOT_TOKEN)

function convertVideo(response, ctx) {

    let audioName = (response.videoName).replace('/', '').replace('\\', '') + ".mp3"

    function completeConvert(err, result) {
        if (err) {
            ctx.reply('Something wrong with converting audio')
        } else {
            console.log(err, result);
            let file = path.join(__dirname, audioName);
            ctx.replyWithAudio({source: file});
            fs.unlink(file, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        }

    }
    function convertProcessing(percent, timemark, targetSize) {
        console.log('Progress:', percent, 'Timemark:', timemark, 'Target Size:', targetSize);
    }

    youtubeConvertor.downloadMP3(
        ctx.message.text,
        path.join(__dirname),
        audioName,
        completeConvert,
        convertProcessing
    )
}

function init() {
    bot.start(ctx => ctx.reply('Welcome to youtube audio bot. Just send youtube link me.'))
    bot.help(ctx => ctx.reply('Help!'))
    bot.on('message', ctx => {
        if (ctx.message.text) {
            youtubeConvertor.getYoutubeVideoInfo(ctx.message.text, function (err, response) {
                if (err) {
                    ctx.reply('Sorry something was wrong with your link. Please try another one.')
                } else {
                    ctx.reply('Processing ....')
                    convertVideo(response, ctx);
                }
            })
        } else {
            ctx.reply('Sorry something was wrong with your link. Please try another one.')
        }
    });
}

function run() {
    init();
    bot.launch();
}

module.exports = {
    run: run
}