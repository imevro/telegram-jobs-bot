import { Markup } from "telegraf";
import createKeyboard from "./helpers/createKeyboard";

export default {
  createJob: [
    ctx => ctx.reply(`Выберите категорию`, createKeyboard(`JS-фронтэнд`, `JS-бэкэнд`)),
    ctx =>
      ctx.reply(
        `Выберите регион`,
        createKeyboard(`Москва`, `Санкт-Петербург`, `Россия`, `Европа`, `США`, `Азия`)
      ),
    ctx => ctx.reply(`Занятость`, createKeyboard(`офис`, `удалёнка`)),
    ctx =>
      ctx.reply(
        `Сколько в деньгах?`,
        createKeyboard(`до 50к`, `50 − 100к`, `100 − 150к`, `150 − 200к`, `200 − 250к`, `от 250к`)
      ),
    ctx => ctx.reply(`Описание вакансии в свободной форме`, Markup.removeKeyboard()),
    ctx =>
      ctx
        .reply(`ОПИСАНИЕ ВАКАНСИИ КОТОРОЕ МЫ СОБРАЛИ`)
        .then(ctx.reply(`Всё верно?`, createKeyboard(`да`, `нет`))),
    ctx =>
    // const messageId = sendMessage(channelId)
    // forwardMessage(messageId, chatId)
      ctx.reply(
        `Мы отправили вакансию в канал @javascript_jobssss, а обсуждение в @javascript_jobs`
      )
  ]
};
