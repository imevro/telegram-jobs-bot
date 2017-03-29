import { Markup } from 'telegraf'
import { COMMANDS_OF_LOCATION } from '../constants/commands'
import { REPLY_ON_CHOOSE_LOCATION } from '../constants/replies'

export default function handleChooseCategory(ctx, next) {
  const inlineKeyboard = Markup.keyboard([
    ...COMMANDS_OF_LOCATION
  ])
  .oneTime()
  .resize()
  .extra()

  return ctx.reply(REPLY_ON_CHOOSE_LOCATION, inlineKeyboard).then(next)
}
