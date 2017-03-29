import { Markup } from 'telegraf'

import { COMMANDS_CHOOSE_LOCATION } from '../constants/commands'
import { REPLY_ON_CHOOSE_LOCATION } from '../constants/replies'

export default function showChooseEmployment(ctx, next) {
  const inlineKeyboard = Markup.keyboard([
    COMMANDS_CHOOSE_LOCATION
  ])
  .oneTime()
  .resize()
  .extra()

  return ctx.reply(REPLY_ON_CHOOSE_LOCATION, inlineKeyboard).then(next)
}
