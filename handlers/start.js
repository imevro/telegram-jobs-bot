import { Markup } from 'telegraf'

import { COMMANDS_CHOOSE_ACTION } from '../constants/commands'
import { REPLY_AT_START } from '../constants/replies'

export default function handleStart(ctx, next) {
  const inlineKeyboard = Markup.keyboard([
    COMMANDS_CHOOSE_ACTION,
  ])
  .oneTime()
  .resize()
  .extra()

  return ctx.reply(REPLY_AT_START, inlineKeyboard).then(next)
}
