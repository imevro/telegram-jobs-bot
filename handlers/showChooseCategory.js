import { Markup } from 'telegraf'

import { COMMANDS_CHOOSE_CATEGORY } from '../constants/commands'
import { REPLY_ON_CREATE_JOB } from '../constants/replies'

export default function showChooseCategory(ctx, next) {
  const inlineKeyboard = Markup.keyboard([
    COMMANDS_CHOOSE_CATEGORY,
  ])
  .oneTime()
  .resize()
  .extra()

  return ctx.reply(REPLY_ON_CREATE_JOB, inlineKeyboard).then(next)
}
