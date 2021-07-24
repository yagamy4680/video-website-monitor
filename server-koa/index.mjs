#!/usr/bin/env node
//
import { URL } from 'url';
import got from 'got';
import querystring from 'querystring';
import moment from 'moment';
import Koa from 'koa';
import KoaBodyParser from 'koa-bodyparser';
import metascraper from 'metascraper';
import metascraper_author from 'metascraper-author';
import metascraper_date from 'metascraper-date';
import metascraper_description from 'metascraper-description';
import metascraper_image from 'metascraper-image';
import metascraper_logo from 'metascraper-logo';
import metascraper_clearbit from 'metascraper-clearbit';
import metascraper_publisher from 'metascraper-publisher';
import metascraper_title from 'metascraper-title';
import metascraper_url from 'metascraper-url';

const IP_ADDR_MATCH = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/

const METASCRAPER = metascraper([
  metascraper_author(),
  metascraper_date(),
  metascraper_description(),
  metascraper_image(),
  metascraper_logo(),
  metascraper_clearbit(),
  metascraper_publisher(),
  metascraper_title(),
  metascraper_url()
]);

const app = new Koa();
app.use(KoaBodyParser({
  extendTypes: {
    json: ['text/plain'] // will parse text/plain type body as a JSON string
  }}));

app.use(async ctx => {
  // console.log(`${ctx.req.method} ${ctx.host}${ctx.path}`);
  let {details, urls} = ctx.request.body;
  // console.log(`capture ${urls.length} urls`);
  // console.log(`details => ${JSON.stringify(details, null, '  ')}`)

  let u = new URL(details.url);
  let docid = u.searchParams.get('docid')
  // console.log(`docid => ${docid}`);

  let now = moment().format('MM/DD HH:mm:ss');
  let ip = ctx.ip.match(IP_ADDR_MATCH)[0];
  // console.log(`ip => ${ip}`);
  let ipenv = `IP${ip.split('.').join('_')}`
  // console.log(`ipenv => ${ipenv}`);

  if (process.env[ipenv] != undefined) {
    ip = process.env[ipenv];
  }
  // console.log(`ip => ${ip}`);

  ;(async () => {
    const yt_url = `https://www.youtube.com/watch?v=${docid}`;
    const { body: html, url } = await got(yt_url);
    const metadata = await METASCRAPER({ html, url });
    console.log(metadata);

    const SLACK_URL = 'https://hooks.slack.com/services/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';
    const {statusCode, body} = 
    await got.post(SLACK_URL, {
      json: {
        text: `\`${ip}\` is watching *${metadata.title}* https://www.youtube.com/watch?v=${docid} ( @yagamy @michelle ) \n\n \`\`\`${metadata.description}\`\`\``
      },
    });
  })()

  let hello = 10;
  ctx.body = {hello};
});

app.listen(3000);
console.log(`app is listening port 3000 ...`);