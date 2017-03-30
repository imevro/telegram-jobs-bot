// flow:
// choose category (frontend, backend, mobile, etc)
// choose location
// choose office or remote
// choose $$$, min, max or "restricted by NDA"
// paste description
// check
// if ok, forward to channel, from channel forward to chat and then paste links

import Telegraf from 'telegraf'
// import sql from 'sql-template-strings'

import db from './db'
import routes from './routes'

if (!process.env.BOT_TOKEN) throw Error(`[telegram-jobs-bot] BOT_TOKEN is undefined`)

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
