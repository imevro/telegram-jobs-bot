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
  COMMANDS_OF_CATEGORY,
  COMMANDS_OF_LOCATION
} from './constants/commands'

import handleStart from './handlers/start'
import handleCreateJob from './handlers/createJob'
import handleChooseCategory from './handlers/chooseCategory'

if (!process.env.BOT_TOKEN) {
  throw Error(`[telegram-jobs-bot] BOT_TOKEN is undefined`)

  process.exit()
}

const app = new Telegraf(process.env.BOT_TOKEN)

app.command(COMMAND_START, handleStart)
app.hears(COMMAND_CREATE_JOB, handleCreateJob)
app.hears(COMMANDS_OF_CATEGORY, handleChooseCategory)

app.startPolling()
