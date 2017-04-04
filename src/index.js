// flow:
// choose category (frontend, backend, mobile, etc)
// choose location
// choose office or remote
// choose $$$, min, max or "restricted by NDA"
// paste description
// check
// if ok, forward to channel, from channel forward to chat and then paste links

import Telegraf from "telegraf";
// import sql from 'sql-template-strings'

import db from "./db";
import routes from "./routes";

if (!process.env.BOT_TOKEN) throw Error(`[telegram-jobs-bot] BOT_TOKEN is undefined`);

const flowsByUserId = {};

function checkForChatType(ctx, next) {
  // eslint-disable-line
  const { type: chatType } = ctx.update.message.chat;

  if (chatType === `private`) return next();
}

function incrementState(userId, currentState) {
  if (currentState === 6) {
    db[userId] = 0; // reset
  } else {
    db[userId]++;
  }
}

function handleFlows(ctx, next) {
  const userId = String(ctx.update.message.chat.id);

  db[userId] = db[userId] || 0;

  const currentState = db[userId];
  const handler = routes.createJob[currentState];

  return handler(ctx, next).then(() => incrementState(userId, currentState)).then(next);
}

function enterFlow(flow) {
  flowsByUserId;

  return next();
}

const app = new Telegraf(process.env.BOT_TOKEN);

app.command(`start`, (ctx, next) =>
  ctx
    .reply(
      `
Выберите действие

/create — создать новую вакансию
/list — посмотреть список моих вакансий
    `
    )
    .then(next));

app.command(`create`, () => enterFlow(`createJob`));
app.use(checkForChatType);
app.use(handleFlows);

app.startPolling();
