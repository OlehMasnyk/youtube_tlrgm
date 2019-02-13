require('dotenv').config()
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)


function init() {
    bot.start(ctx => ctx.reply('Welcome to youtube audio bot. Just send youtube link me.'))
    bot.help(ctx => ctx.reply('Help!'))
    bot.on('message', ctx => {
        ctx.reply('sdsdsdsd')
    });
    bot.on()
}

function run() {
    init()
    bot.launch();
}

module.exports = {
    run: run
}