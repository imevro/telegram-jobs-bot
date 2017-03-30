import { Markup } from 'telegraf'
import createKeyboard from './helpers/createKeyboard'

export default [
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
