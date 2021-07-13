#!/usr/bin/env node
//
const url = require('url');
const querystring = require('querystring');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser({
  extendTypes: {
    json: ['text/plain'] // will parse text/plain type body as a JSON string
  }}));

app.use(async ctx => {
  // console.log(`${ctx.req.method} ${ctx.host}${ctx.path}`);
  let {details, urls} = ctx.request.body;
  // console.log(`capture ${urls.length} urls`);
  // console.log(`details => ${JSON.stringify(details, null, '  ')}`)

  let u = url.parse(details.url);
  // console.log(`u.query => ${u.query}`);

  let qs = querystring.parse(u.query);
  // console.log(`qs => ${JSON.stringify(qs, null, ' ')}`)

  console.log(`${ctx.ip} watching https://www.youtube.com/watch?v=${qs.docid}`);

  let hello = 10;
  ctx.body = {hello};
});

app.listen(3000);
