import { Markup } from 'telegraf'

export default function(...buttons) { // eslint-disable-line
  return Markup.keyboard([
    buttons,
  ])
  .oneTime()
  .resize()
  .extra()
}
