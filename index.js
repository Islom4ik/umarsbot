const { Scenes, session, Telegraf } = require('telegraf');
require('dotenv').config()

const { enter, leave } = Scenes.Stage;

const getscene = new Scenes.BaseScene("getscene");


getscene.enter(async ctx => {
    await ctx.reply('Скиньте url фотки:')
})

getscene.on("text", async ctx => {
    await ctx.replyWithPhoto({url: ctx.message.text})
    await ctx.scene.leave('getscene')
})


const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([getscene]);
bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => ctx.reply('hello guy'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.launch({dropPendingUpdates: true});

bot.command('photo', async ctx => {
    try {
        await ctx.scene.enter('getscene')
    } catch (e) {
        console.error(e);
    }
})


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));