import { Markup } from 'telegraf'
import { COMMANDS_OF_CATEGORY } from '../constants/commands'
import { REPLY_ON_CREATE_JOB } from '../constants/replies'

export default function handleCreateJob(ctx, next) {
  const inlineKeyboard = Markup.keyboard([
    COMMANDS_OF_CATEGORY
  ])
  .oneTime()
  .resize()
  .extra()

  return ctx.reply(REPLY_ON_CREATE_JOB, inlineKeyboard).then(next)
}
