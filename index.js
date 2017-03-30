// flow:
// choose category (frontend, backend, mobile, etc)
// choose location
// choose office or remote
// choose $$$, min, max or "restricted by NDA"
// paste description
// check
// if ok, forward to channel, from channel forward to chat and then paste links

import Telegraf, { Markup } from 'telegraf'
// import sql from 'sql-template-strings'

import db from './db'

if (!process.env.BOT_TOKEN) throw Error(`[telegram-jobs-bot] BOT_TOKEN is undefined`)

function createKeyboard(...buttons) { // eslint-disable-line
  return Markup.keyboard([
    buttons,
  ])
  .oneTime()
  .resize()
  .extra()
}

const routes = [
  ctx => (
    ctx.reply(
      `Выберите действие`,

      createKeyboard(
        `🔥 создать вакансию`,
      ),
    )
  ),
  ctx => (
    ctx.reply(
      `1/5 Выберите категорию`,

      createKeyboard(
        `JS-фронтэнд`,
        `JS-бэкэнд`,
      ),
    )
  ),
  ctx => (
    ctx.reply(
      `2/5 Выберите регион`,

      createKeyboard(
        `Москва`,
        `Санкт-Петербург`,
        `Россия`,
        `Европа`,
        `США`,
        `Азия`,
      ),
    )
  ),
  ctx => (
    ctx.reply(
      `3/5 Занятость`,

      createKeyboard(
        `офис`,
        `удалёнка`,
      ),
    )
  ),
  ctx => (
    ctx.reply(
      `4/5 Сколько в деньгах?`,

      createKeyboard(
        `до 50к`,
        `50 − 100к`,
        `100 − 150к`,
        `150 − 200к`,
        `200 − 250к`,
        `от 250к`,
      ),
    )
  ),
  ctx => (
    ctx.reply(
      `5/5 Описание вакансии в свободной форме`,
      Markup.removeKeyboard(),
    )
  ),
  (ctx, next, userId) => (
    ctx.reply(`ОПИСАНИЕ ВАКАНСИИ КОТОРОЕ МЫ СОБРАЛИ`)
      .then(ctx.reply(
        `Всё правильно, ${userId}?`,

        createKeyboard(
          `да`,
          `нет`,
        ),
      ))
  ),
  ctx => (
    // const messageId = sendMessage(channelId)
    // forwardMessage(messageId, chatId)
    ctx.reply(
      `Мы отправили вакансию в канал @javascript_jobssss, а обсуждение в @javascript_jobs`,
    )
  ),
]

function incrementState(userId, currentState) {
  if (currentState === 7) {
    // db.updateStep(userId, 0)
    db[userId] = 0 // reset
  } else {
    // db.updateStep(userId)
    db[userId]++
  }
}

function stateMachineMiddleware(ctx, next) {
  const { type: chatType } = ctx.update.message.chat
  const userId = String(ctx.update.message.chat.id)

  if (chatType === `private`) {
    // const currentState = db.getStep(userId)
    const currentState = db[userId] || 0
    const handler = routes[currentState]

    db[userId] = currentState

    return handler(ctx, next, userId)
      .then(() => incrementState(userId, currentState))
      .then(next)
  }

  return next()
}

const app = new Telegraf(process.env.BOT_TOKEN)

app.use(stateMachineMiddleware)
app.startPolling()
