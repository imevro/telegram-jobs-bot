import { Markup } from 'telegraf'

import { COMMANDS_OF_START } from '../constants/commands'
import { REPLY_AT_START } from '../constants/replies'

export default function handleStart(ctx, next) {
  const inlineKeyboard = Markup.keyboard([
    COMMANDS_OF_START
  ])
  .oneTime()
  .resize()
  .extra()

  return ctx.reply(REPLY_AT_START, inlineKeyboard).then(next)
}
