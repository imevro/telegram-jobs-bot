// flow:
// choose category (frontend, backend, mobile, etc)
// choose location
// choose office or remote
// choose $$$, min, max or "restricted by NDA"
// paste description
// check
// if ok, forward to channel, from channel forward to chat and then paste links
import Telegraf, { Markup } from 'telegraf'

import {
  COMMAND_START,
  COMMAND_CREATE_JOB,
  COMMANDS_CHOOSE_CATEGORY,
  COMMANDS_CHOOSE_LOCATION
} from './constants/commands'

import showActions from './handlers/start'
import showChooseCategory from './handlers/showChooseCategory'
import showChooseLocation from './handlers/showChooseLocation'
import showChooseEmployment from './handlers/showChooseEmployment'

if (!process.env.BOT_TOKEN) {
  throw Error(`[telegram-jobs-bot] BOT_TOKEN is undefined`)

  process.exit()
}

const app = new Telegraf(process.env.BOT_TOKEN)

app.command(COMMAND_START, showActions)
app.hears(COMMAND_CREATE_JOB, showChooseCategory)
app.hears(COMMANDS_CHOOSE_CATEGORY, showChooseLocation)
app.hears(COMMANDS_CHOOSE_LOCATION, showChooseEmployment)

app.startPolling()
